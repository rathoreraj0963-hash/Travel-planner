/**
 * File: backend/services/hotelService.js
 *
 * HOTEL AGENT
 * Simulates a hotel search API call.
 * Returns mock accommodation options for a given destination and duration.
 */

// Mock hotel data pool
const HOTEL_DATA = {
  default: [
    { name: 'CityStay Inn',       stars: 3, pricePerNight: 75,  amenities: ['WiFi', 'Breakfast', 'Pool'],              area: 'City Centre' },
    { name: 'Grand Horizon Hotel',stars: 4, pricePerNight: 140, amenities: ['WiFi', 'Breakfast', 'Gym', 'Spa'],        area: 'Downtown'    },
    { name: 'Apex Suites',        stars: 5, pricePerNight: 280, amenities: ['WiFi', 'All-inclusive', 'Concierge'],      area: 'Waterfront'  },
    { name: 'Budget Nest',        stars: 2, pricePerNight: 45,  amenities: ['WiFi'],                                   area: 'Suburbs'     },
  ],
  paris: [
    { name: 'Maison Parisienne',  stars: 4, pricePerNight: 185, amenities: ['WiFi', 'Breakfast', 'City View'],         area: 'Marais'      },
    { name: 'Eiffel Guesthouse',  stars: 3, pricePerNight: 110, amenities: ['WiFi', 'Breakfast'],                      area: '7th Arr.'    },
    { name: 'Palais Royal Suites',stars: 5, pricePerNight: 420, amenities: ['WiFi', 'Full Board', 'Butler', 'Spa'],    area: '1st Arr.'    },
  ],
  tokyo: [
    { name: 'Shinjuku Capsule+',  stars: 2, pricePerNight: 55,  amenities: ['WiFi', 'Locker'],                         area: 'Shinjuku'    },
    { name: 'Tokyo Bay Hotel',    stars: 4, pricePerNight: 165, amenities: ['WiFi', 'Breakfast', 'Onsen'],              area: 'Odaiba'      },
    { name: 'Kyoto-style Ryokan', stars: 4, pricePerNight: 200, amenities: ['WiFi', 'Traditional Breakfast', 'Onsen'], area: 'Asakusa'     },
  ],
  dubai: [
    { name: 'Desert Bloom Hotel', stars: 4, pricePerNight: 195, amenities: ['WiFi', 'Pool', 'Breakfast'],              area: 'Downtown Dubai'},
    { name: 'Palm Luxury Resort', stars: 5, pricePerNight: 480, amenities: ['WiFi', 'Beach', 'All-inclusive', 'Spa'],  area: 'Palm Jumeirah'},
    { name: 'Budget Stay Dubai',  stars: 3, pricePerNight: 90,  amenities: ['WiFi', 'Breakfast'],                      area: 'Deira'         },
  ],
  bali: [
    { name: 'Jungle Villa Bali',  stars: 4, pricePerNight: 120, amenities: ['WiFi', 'Pool', 'Breakfast', 'Yoga'],      area: 'Ubud'        },
    { name: 'Seminyak Beach Resort',stars:5,pricePerNight: 310, amenities: ['WiFi', 'Beach', 'All-inclusive', 'Spa'],  area: 'Seminyak'    },
    { name: 'Kuta Budget Inn',    stars: 2, pricePerNight: 40,  amenities: ['WiFi'],                                   area: 'Kuta'        },
  ],
};

const simulateDelay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * getHotels
 * @param {string} destination - City/country name
 * @param {number} tripDays    - Number of nights
 * @returns {Promise<Array>}   - Array of hotel options with total cost
 */
const getHotels = async (destination, tripDays) => {
  await simulateDelay(400); // Simulate API latency

  const key = destination.toLowerCase().trim();
  const matchedKey = Object.keys(HOTEL_DATA).find((k) => key.includes(k));
  const rawHotels = HOTEL_DATA[matchedKey || 'default'];

  const enriched = rawHotels.map((h, idx) => ({
    id: `HT-${Date.now()}-${idx}`,
    ...h,
    destination,
    nights: tripDays,
    totalCost: parseFloat((h.pricePerNight * tripDays).toFixed(2)),
    rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
    reviewCount: Math.floor(Math.random() * 2000) + 100,
    freeCancellation: h.stars >= 3,
  }));

  console.log(`  🏨  [Hotel Agent] Found ${enriched.length} hotels in ${destination}`);
  return enriched;
};

module.exports = { getHotels };
