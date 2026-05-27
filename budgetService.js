/**
 * File: backend/controllers/itineraryController.js
 *
 * Orchestrates the multi-agent workflow:
 *   1. Receive validated request
 *   2. Run Flight, Hotel, Food agents IN PARALLEL (Promise.all)
 *   3. Send results to Budget Optimization Agent
 *   4. Persist to MongoDB
 *   5. Return final itinerary to client
 */

const ItineraryModel = require('../../models/Itinerary');
const flightService  = require('../services/flightService');
const hotelService   = require('../services/hotelService');
const foodService    = require('../services/foodService');
const budgetService  = require('../services/budgetService');

// ─── Helper: compute trip duration in days ───────────────────────────────────
const getTripDays = (startDate, endDate) => {
  const ms = new Date(endDate) - new Date(startDate);
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
};

/**
 * POST /api/itinerary/generate
 * Main orchestrator — event-driven agent pipeline
 */
const generateItinerary = async (req, res) => {
  try {
    const { destination, startDate, endDate, budget, preferences = [], userName } = req.body;

    const tripDays = getTripDays(startDate, endDate);
    const budgetNum = parseFloat(budget);

    console.log(`\n🚀 [AGENT PIPELINE] Starting for: ${destination} | ${tripDays} days | $${budgetNum}`);

    // ── STEP 1: Trigger all agents in parallel ──────────────────────────────
    console.log('📡 [AGENTS] Dispatching Flight, Hotel, Food agents in parallel...');
    const [flights, hotels, foods] = await Promise.all([
      flightService.getFlights(destination, startDate, endDate),
      hotelService.getHotels(destination, tripDays),
      foodService.getFoodOptions(destination, tripDays),
    ]);
    console.log('✅ [AGENTS] All agents responded.');

    // ── STEP 2: Send to Budget Optimization Agent ───────────────────────────
    console.log('💰 [BUDGET AGENT] Optimizing selections...');
    const optimizedPlan = await budgetService.optimizeBudget({
      budget: budgetNum,
      tripDays,
      flights,
      hotels,
      foods,
    });
    console.log(`✅ [BUDGET AGENT] Optimization complete. Total: $${optimizedPlan.totalCost}`);

    // ── STEP 3: Build final itinerary document ──────────────────────────────
    const dailySchedule = buildDailySchedule(
      startDate,
      tripDays,
      optimizedPlan.selectedHotel,
      optimizedPlan.selectedFoods
    );

    const itineraryData = {
      userName: userName || 'Traveller',
      destination,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      tripDays,
      budget: budgetNum,
      preferences,
      selectedFlight: optimizedPlan.selectedFlight,
      selectedHotel:  optimizedPlan.selectedHotel,
      selectedFoods:  optimizedPlan.selectedFoods,
      dailySchedule,
      totalCost:      optimizedPlan.totalCost,
      savings:        budgetNum - optimizedPlan.totalCost,
      budgetStatus:   optimizedPlan.budgetStatus,
      generatedAt:    new Date(),
    };

    // ── STEP 4: Persist to MongoDB ──────────────────────────────────────────
    const saved = await ItineraryModel.create(itineraryData);
    console.log(`💾 [DB] Itinerary saved: ${saved._id}`);

    return res.status(201).json({
      success: true,
      message: 'Itinerary generated successfully',
      itinerary: saved,
    });
  } catch (err) {
    console.error('[CONTROLLER ERROR]', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Builds a day-by-day schedule array
 */
const buildDailySchedule = (startDate, tripDays, hotel, foods) => {
  const schedule = [];
  for (let i = 0; i < tripDays; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const dayFoods = foods.filter((f) => f.day === i + 1);

    schedule.push({
      day: i + 1,
      date: date.toISOString().split('T')[0],
      accommodation: hotel ? hotel.name : 'TBD',
      meals: {
        breakfast: dayFoods.find((f) => f.meal === 'breakfast') || null,
        lunch:     dayFoods.find((f) => f.meal === 'lunch')     || null,
        dinner:    dayFoods.find((f) => f.meal === 'dinner')    || null,
      },
      activities: generateActivities(i + 1),
    });
  }
  return schedule;
};

/**
 * Generates placeholder activity suggestions per day
 */
const generateActivities = (dayNum) => {
  const pool = [
    'City walking tour',
    'Local museum visit',
    'Street food market exploration',
    'Sunset viewpoint',
    'Shopping district stroll',
    'Historical monument visit',
    'Boat/ferry ride',
    'Cooking class',
    'Local festival (if applicable)',
    'Spa & relaxation day',
  ];
  const start = ((dayNum - 1) * 2) % pool.length;
  return [pool[start], pool[(start + 1) % pool.length]];
};

// ─── GET /api/itinerary/:id ───────────────────────────────────────────────────
const getItinerary = async (req, res) => {
  try {
    const itinerary = await ItineraryModel.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ success: false, error: 'Itinerary not found' });
    }
    return res.json({ success: true, itinerary });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// ─── GET /api/itinerary ───────────────────────────────────────────────────────
const listItineraries = async (_req, res) => {
  try {
    const list = await ItineraryModel.find().sort({ generatedAt: -1 }).limit(20);
    return res.json({ success: true, count: list.length, itineraries: list });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// ─── DELETE /api/itinerary/:id ────────────────────────────────────────────────
const deleteItinerary = async (req, res) => {
  try {
    const deleted = await ItineraryModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Itinerary not found' });
    }
    return res.json({ success: true, message: 'Itinerary deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { generateItinerary, getItinerary, listItineraries, deleteItinerary };
