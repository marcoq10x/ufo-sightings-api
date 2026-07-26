const express = require('express');
const router = express.Router();
const sightingsController = require('../controllers/sightings');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Public Routes
router.get('/', sightingsController.getAll);
router.get('/:id', sightingsController.getSingle);

// Protected Routes
router.post('/', isAuthenticated, validation.validateSighting, sightingsController.createSighting);
router.put('/:id', isAuthenticated, validation.validateSighting, sightingsController.updateSighting);
router.delete('/:id', isAuthenticated, sightingsController.deleteSighting);

module.exports = router;