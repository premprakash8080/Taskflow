const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { register, login, logout, getCurrentUser } = require('../controllers/authController');

// Public routes — Auth nahi chahiye
router.post('/register', register);
router.post('/login', login);

// Protected routes — Auth chahiye
router.post('/logout', authMiddleware, logout);
router.get('/profile', authMiddleware, getCurrentUser);

module.exports = router;