const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { registerUser, loginUser,dashboard } = require('../controllers/authController');

// Routes
router.post('/register', registerUser); // Public route for user registration
router.post('/login', loginUser);       // Public route for user login
router.get('/dashboard', authMiddleware, dashboard);


module.exports = router;
