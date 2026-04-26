const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getProfile, updateProfile, listMembers, inviteMember, updateUserRole } = require('../controllers/userController');

// Sab routes protected hain — auth chahiye
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.get('/', authMiddleware, listMembers);
router.post('/invite', authMiddleware, inviteMember);
router.put('/:userId/role', authMiddleware, updateUserRole);

module.exports = router;