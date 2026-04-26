const { Notification } = require('../models/index');


// List Notifications

const listNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { user_id: req.user.id },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ notifications });

  } catch (error) {
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Mark Notification Read

const markNotificationRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    // 1. Notification dhundo
    const notification = await Notification.findOne({
      where: { id: notificationId, user_id: req.user.id },
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    // 2. Mark as read
    await notification.update({ is_read: true });

    return res.status(200).json({ message: 'Notification marked as read.' });

  } catch (error) {
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

module.exports = { listNotifications, markNotificationRead };