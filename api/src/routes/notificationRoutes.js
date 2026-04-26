const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { listNotifications, markNotificationRead } = require('../controllers/notificationController');

// Sab routes protected hain
router.get('/', authMiddleware, listNotifications);
router.put('/:notificationId/read', authMiddleware, markNotificationRead);

module.exports = router;