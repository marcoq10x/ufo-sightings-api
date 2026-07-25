const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Anyone can view the records (No authentication required)
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getSingleUser);

// Only logged in users can create, update, or delete records
router.post('/', isAuthenticated, validation.validateUser, usersController.createUser);
router.put('/:id', isAuthenticated, validation.validateUser, usersController.updateUser);
router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;