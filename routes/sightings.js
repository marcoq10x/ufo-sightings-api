const express = require('express');
const router = express.Router();
const sightingsController = require('../controllers/sightings');
const validation = require('../middleware/validate');

router.get('/', sightingsController.getAll);
router.get('/:id', sightingsController.getSingle);

// The validation middleware is injected here so bad data gets rejected automatically
router.post('/', validation.validateSighting, sightingsController.createSighting);
router.put('/:id', validation.validateSighting, sightingsController.updateSighting);

router.delete('/:id', sightingsController.deleteSighting);

module.exports = router;