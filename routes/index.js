const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/sightings', require('./sightings'));

module.exports = router;