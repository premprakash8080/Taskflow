const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { register, login, logout, getCurrentUser, verifyToken } = require('../controllers/authController');

// Public routes — Auth nahi chahiye
router.post('/register', register);
router.post('/login', login);
router.post('/verifyToken', verifyToken);

// Protected routes — Auth chahiye
router.post('/logout', authMiddleware, logout);
router.get('/profile', authMiddleware, getCurrentUser);
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;
