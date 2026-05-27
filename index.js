/**
 * File: backend/routes/itineraryRoutes.js
 * Defines all REST endpoints for the itinerary workflow.
 * Delegates to itineraryController for business logic.
 */

const express = require('express');
const router = express.Router();
const {
  generateItinerary,
  getItinerary,
  listItineraries,
  deleteItinerary,
} = require('../controllers/itineraryController');
const { validateItineraryInput } = require('../middleware/validateInput');

// POST /api/itinerary/generate
// Triggers the full multi-agent pipeline
router.post('/generate', validateItineraryInput, generateItinerary);

// GET /api/itinerary/:id
// Fetch a saved itinerary by ID
router.get('/:id', getItinerary);

// GET /api/itinerary
// List all saved itineraries
router.get('/', listItineraries);

// DELETE /api/itinerary/:id
// Delete an itinerary
router.delete('/:id', deleteItinerary);

module.exports = router;
