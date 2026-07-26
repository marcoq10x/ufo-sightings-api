const express = require('express');
const router = express.express(); // or express.Router(); let's use standard:
const expressRouter = express.Router();
const sightingsController = require('../controllers/sightings');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Public Routes
expressRouter.get('/', sightingsController.getAll);
expressRouter.get('/:id', sightingsController.getSingle);

// Protected Routes - The bouncer MUST be here
expressRouter.post('/', isAuthenticated, validation.validateSighting, sightingsController.createSighting);
expressRouter.put('/:id', isAuthenticated, validation.validateSighting, sightingsController.updateSighting);
expressRouter.delete('/:id', isAuthenticated, sightingsController.deleteSighting);

module.exports = expressRouter;