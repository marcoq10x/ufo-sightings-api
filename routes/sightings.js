const express = require('express');
const router = express.Router();
const sightingsController = require('../controllers/sightings');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Anyone can view the records (No authentication required)
router.get('/', sightingsController.getAll);
router.get('/:id', sightingsController.getSingle);

// Only logged-in users can create, update, or delete records
router.post('/', isAuthenticated, validation.validateSighting, sightingsController.createSighting);
router.put('/:id', isAuthenticated, validation.validateSighting, sightingsController.updateSighting);
router.delete('/:id', isAuthenticated, sightingsController.deleteSighting);

module.exports = router;