const express = require('express');
const authController = require('../controllers/authController');
const { validateUser, validateLogin, validate } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Register Route
router.post('/register', validateUser, validate, authController.register);

// Login Route
router.post('/login', validateLogin, validate, authController.login);

// Get Current User
router.get('/me', authenticateToken, authController.getCurrentUser);

module.exports = router;
