const express = require('express');
const router = express.Router();
const sightingsController = require('../controllers/sightings');

router.get('/', sightingsController.getAll);
router.get('/:id', sightingsController.getSingle);
router.post('/', sightingsController.createSighting);
router.put('/:id', sightingsController.updateSighting);
router.delete('/:id', sightingsController.deleteSighting);

module.exports = router;