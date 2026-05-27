/**
 * File: backend/services/budgetService.js
 *
 * BUDGET OPTIMIZATION AGENT
 * Receives outputs from Flight, Hotel, and Food agents.
 * Selects the best combination that fits within the user's budget.
 * If total cost exceeds budget → downgrades selections iteratively.
 */

/**
 * Calculates total cost for a given selection
 * @param {Object} flight  - Selected flight object
 * @param {Object} hotel   - Selected hotel object
 * @param {Array}  foods   - Selected food options
 * @returns {number}       - Total estimated cost
 */
const calcTotal = (flight, hotel, foods) => {
  const flightCost = flight?.price        || 0;
  const hotelCost  = hotel?.totalCost     || 0;
  const foodCost   = foods.reduce((sum, f) => sum + (f.pricePerPerson || 0), 0);
  return parseFloat((flightCost + hotelCost + foodCost).toFixed(2));
};

/**
 * Sort helper: ascending by cost
 */
const byPriceAsc = (a, b) => (a.price || a.pricePerNight || 0) - (b.price || b.pricePerNight || 0);

/**
 * optimizeBudget
 * Main budget optimization function.
 *
 * Strategy:
 *   1. Start with cheapest flight + cheapest hotel
 *   2. Calculate total with all foods
 *   3. If over budget → try removing expensive dinner options one day at a time
 *   4. If still over budget → mark as "over budget" but return best possible plan
 *
 * @param {Object} params
 * @param {number} params.budget
 * @param {number} params.tripDays
 * @param {Array}  params.flights
 * @param {Array}  params.hotels
 * @param {Array}  params.foods
 * @returns {Promise<Object>} optimized plan
 */
const optimizeBudget = async ({ budget, tripDays, flights, hotels, foods }) => {
  console.log(`  💰  [Budget Agent] Budget: $${budget} | Analyzing ${flights.length} flights, ${hotels.length} hotels, ${foods.length} meals`);

  // ── Phase 1: Sort all options by price ascending ──────────────────────────
  const sortedFlights = [...flights].sort(byPriceAsc);
  const sortedHotels  = [...hotels].sort(byPriceAsc);

  let selectedFlight = sortedFlights[0]; // cheapest flight
  let selectedHotel  = sortedHotels[0];  // cheapest hotel
  let selectedFoods  = [...foods];

  let totalCost = calcTotal(selectedFlight, selectedHotel, selectedFoods);
  let iterations = 0;
  const maxIterations = 10;

  // ── Phase 2: Optimization loop ────────────────────────────────────────────
  while (totalCost > budget && iterations < maxIterations) {
    iterations++;
    console.log(`  🔄  [Budget Agent] Iteration ${iterations}: Total $${totalCost} > Budget $${budget}. Recalculating...`);

    // Strategy A: Try to swap to a cheaper flight (if more expensive one selected)
    const currentFlightIdx = sortedFlights.findIndex((f) => f.id === selectedFlight.id);
    if (currentFlightIdx > 0) {
      selectedFlight = sortedFlights[currentFlightIdx - 1];
      totalCost = calcTotal(selectedFlight, selectedHotel, selectedFoods);
      continue;
    }

    // Strategy B: Try a cheaper hotel
    const currentHotelIdx = sortedHotels.findIndex((h) => h.id === selectedHotel.id);
    if (currentHotelIdx < sortedHotels.length - 1) {
      selectedHotel = sortedHotels[currentHotelIdx + 1];
      // Recalculate hotel total cost
      selectedHotel = {
        ...selectedHotel,
        totalCost: parseFloat((selectedHotel.pricePerNight * tripDays).toFixed(2)),
      };
      totalCost = calcTotal(selectedFlight, selectedHotel, selectedFoods);
      continue;
    }

    // Strategy C: Replace most expensive dinners with cheapest lunch options
    const mostExpensiveDinner = [...selectedFoods]
      .filter((f) => f.meal === 'dinner')
      .sort((a, b) => b.pricePerPerson - a.pricePerPerson)[0];

    if (mostExpensiveDinner) {
      // Replace dinner with a cheaper lunch-level option
      selectedFoods = selectedFoods.map((f) =>
        f.id === mostExpensiveDinner.id
          ? { ...f, pricePerPerson: Math.max(f.pricePerPerson * 0.6, 12), name: `Budget ${f.name}` }
          : f
      );
      totalCost = calcTotal(selectedFlight, selectedHotel, selectedFoods);
      continue;
    }

    // Strategy D: Nothing more to cut — break
    break;
  }

  const budgetStatus =
    totalCost <= budget
      ? 'within_budget'
      : totalCost <= budget * 1.1
      ? 'slightly_over'
      : 'over_budget';

  const breakdown = {
    flight: parseFloat((selectedFlight?.price || 0).toFixed(2)),
    hotel:  parseFloat((selectedHotel?.totalCost || 0).toFixed(2)),
    food:   parseFloat(selectedFoods.reduce((s, f) => s + f.pricePerPerson, 0).toFixed(2)),
  };

  console.log(`  ✅  [Budget Agent] Final: $${totalCost} | Status: ${budgetStatus} | Iterations: ${iterations}`);

  return {
    selectedFlight,
    selectedHotel,
    selectedFoods,
    totalCost,
    breakdown,
    budgetStatus,
    optimizationIterations: iterations,
  };
};

module.exports = { optimizeBudget };
