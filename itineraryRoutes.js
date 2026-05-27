/**
 * File: backend/services/flightService.js
 *
 * FLIGHT AGENT
 * Simulates calling a flight search API.
 * Returns a list of mock flight options for the given destination & dates.
 * In production, replace the mock logic with a real API (Amadeus, Skyscanner, etc.)
 */

// Mock flight data pool — keyed by destination keyword
const FLIGHT_DATA = {
  default: [
    { airline: 'SkyWings', flightNo: 'SW-101', class: 'Economy',  price: 320, duration: '6h 30m', stops: 0 },
    { airline: 'AirGlobe', flightNo: 'AG-205', class: 'Economy',  price: 275, duration: '8h 00m', stops: 1 },
    { airline: 'SkyWings', flightNo: 'SW-302', class: 'Business', price: 890, duration: '6h 30m', stops: 0 },
    { airline: 'PeakJet',  flightNo: 'PJ-410', class: 'Economy',  price: 299, duration: '7h 15m', stops: 1 },
  ],
  paris: [
    { airline: 'EuroFly',  flightNo: 'EF-001', class: 'Economy',  price: 410, duration: '9h 45m', stops: 0 },
    { airline: 'AirGlobe', flightNo: 'AG-110', class: 'Economy',  price: 355, duration: '11h 00m',stops: 1 },
    { airline: 'EuroFly',  flightNo: 'EF-202', class: 'Business', price: 1100,duration: '9h 45m', stops: 0 },
  ],
  tokyo: [
    { airline: 'NipponAir',flightNo: 'NA-505', class: 'Economy',  price: 680, duration: '14h 20m',stops: 0 },
    { airline: 'SkyWings', flightNo: 'SW-610', class: 'Economy',  price: 590, duration: '16h 00m',stops: 1 },
    { airline: 'NipponAir',flightNo: 'NA-700', class: 'Business', price: 1950,duration: '14h 20m',stops: 0 },
  ],
  dubai: [
    { airline: 'DesertAir',flightNo: 'DA-303', class: 'Economy',  price: 440, duration: '8h 00m', stops: 0 },
    { airline: 'AirGlobe', flightNo: 'AG-320', class: 'Economy',  price: 380, duration: '10h 15m',stops: 1 },
    { airline: 'DesertAir',flightNo: 'DA-404', class: 'Business', price: 1250,duration: '8h 00m', stops: 0 },
  ],
  bali: [
    { airline: 'IslandHop',flightNo: 'IH-220', class: 'Economy',  price: 510, duration: '12h 30m',stops: 1 },
    { airline: 'SkyWings', flightNo: 'SW-815', class: 'Economy',  price: 470, duration: '13h 45m',stops: 1 },
    { airline: 'IslandHop',flightNo: 'IH-301', class: 'Business', price: 1400,duration: '12h 30m',stops: 1 },
  ],
};

/**
 * Simulates a network delay to mimic a real API call
 */
const simulateDelay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * getFlights
 * @param {string} destination - City/country name
 * @param {string} startDate   - ISO date string
 * @param {string} endDate     - ISO date string
 * @returns {Promise<Array>}   - Array of flight options
 */
const getFlights = async (destination, startDate, endDate) => {
  await simulateDelay(350); // Simulate API latency

  const key = destination.toLowerCase().trim();
  // Find matching destination key or fall back to default
  const matchedKey = Object.keys(FLIGHT_DATA).find((k) =>
    key.includes(k)
  );
  const rawFlights = FLIGHT_DATA[matchedKey || 'default'];

  // Enrich mock data with dynamic fields
  const enriched = rawFlights.map((f, idx) => ({
    id: `FL-${Date.now()}-${idx}`,
    ...f,
    origin: 'Your City',
    destination,
    departureDate: startDate,
    returnDate: endDate,
    seatsAvailable: Math.floor(Math.random() * 30) + 5,
    refundable: f.class === 'Business',
  }));

  console.log(`  ✈️  [Flight Agent] Found ${enriched.length} flights to ${destination}`);
  return enriched;
};

module.exports = { getFlights };
