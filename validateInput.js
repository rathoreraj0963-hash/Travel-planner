/**
 * File: backend/services/foodService.js
 *
 * FOOD AGENT
 * Simulates a restaurant/dining API.
 * Generates meal suggestions for each day of the trip (breakfast, lunch, dinner).
 */

// Dining pool per destination
const FOOD_DATA = {
  default: {
    breakfast: [
      { name: "The Morning Table",   cuisine: 'Continental', pricePerPerson: 12, rating: 4.2 },
      { name: "Sunrise Café",        cuisine: 'American',    pricePerPerson: 9,  rating: 4.0 },
      { name: "Baker & Brew",        cuisine: 'Bakery',      pricePerPerson: 8,  rating: 4.5 },
    ],
    lunch: [
      { name: "Midday Bites",        cuisine: 'International',pricePerPerson: 18, rating: 4.1 },
      { name: "Urban Grill",         cuisine: 'Grill',        pricePerPerson: 22, rating: 4.4 },
      { name: "Garden Bowl",         cuisine: 'Vegan',        pricePerPerson: 15, rating: 4.3 },
    ],
    dinner: [
      { name: "Golden Fork",         cuisine: 'Fine Dining',  pricePerPerson: 55, rating: 4.7 },
      { name: "Night Owl Bistro",    cuisine: 'Fusion',       pricePerPerson: 35, rating: 4.5 },
      { name: "The Local Table",     cuisine: 'Traditional',  pricePerPerson: 25, rating: 4.2 },
    ],
  },
  paris: {
    breakfast: [
      { name: "Café de Flore",       cuisine: 'French Café', pricePerPerson: 14, rating: 4.6 },
      { name: "Boulangerie Saveur",  cuisine: 'Bakery',      pricePerPerson: 8,  rating: 4.8 },
    ],
    lunch: [
      { name: "Le Marché Bistro",    cuisine: 'French',      pricePerPerson: 28, rating: 4.4 },
      { name: "Crêperie Montmartre", cuisine: 'Crêpes',      pricePerPerson: 15, rating: 4.5 },
    ],
    dinner: [
      { name: "Chez Louis",          cuisine: 'Haute Cuisine',pricePerPerson: 80, rating: 4.8 },
      { name: "Brasserie Lumière",   cuisine: 'Brasserie',   pricePerPerson: 45, rating: 4.6 },
    ],
  },
  tokyo: {
    breakfast: [
      { name: "Morning Ramen Bar",   cuisine: 'Ramen',       pricePerPerson: 10, rating: 4.5 },
      { name: "Onigiri Station",     cuisine: 'Japanese',    pricePerPerson: 6,  rating: 4.3 },
    ],
    lunch: [
      { name: "Sushi Sakura",        cuisine: 'Sushi',       pricePerPerson: 35, rating: 4.7 },
      { name: "Tonkatsu House",      cuisine: 'Japanese',    pricePerPerson: 20, rating: 4.4 },
    ],
    dinner: [
      { name: "Yakitori Alley",      cuisine: 'Yakitori',    pricePerPerson: 40, rating: 4.6 },
      { name: "Kaiseki Rin",         cuisine: 'Kaiseki',     pricePerPerson: 95, rating: 4.9 },
    ],
  },
};

const simulateDelay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Picks a random item from an array
 */
const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * getFoodOptions
 * @param {string} destination - City/country name
 * @param {number} tripDays    - Number of trip days
 * @returns {Promise<Array>}   - Array of meal suggestions by day
 */
const getFoodOptions = async (destination, tripDays) => {
  await simulateDelay(280); // Simulate API latency

  const key = destination.toLowerCase().trim();
  const matchedKey = Object.keys(FOOD_DATA).find((k) => key.includes(k));
  const pool = FOOD_DATA[matchedKey || 'default'];

  const meals = [];

  for (let day = 1; day <= tripDays; day++) {
    // Pick a random option from each meal pool for this day
    const breakfast = {
      ...randomPick(pool.breakfast),
      meal: 'breakfast',
      day,
      id: `FD-BF-${day}-${Date.now()}`,
    };
    const lunch = {
      ...randomPick(pool.lunch),
      meal: 'lunch',
      day,
      id: `FD-LN-${day}-${Date.now()}`,
    };
    const dinner = {
      ...randomPick(pool.dinner),
      meal: 'dinner',
      day,
      id: `FD-DN-${day}-${Date.now()}`,
    };

    meals.push(breakfast, lunch, dinner);
  }

  // Total food cost across all days
  const totalFoodCost = meals.reduce((sum, m) => sum + m.pricePerPerson, 0);

  console.log(
    `  🍽️  [Food Agent] Generated ${meals.length} meals for ${tripDays} days. Est. cost: $${totalFoodCost}`
  );

  return meals;
};

module.exports = { getFoodOptions };
