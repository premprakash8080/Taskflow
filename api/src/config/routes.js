/**
 * Import Route files and set in express middleware
 */

exports.set_routes = (app) => {
 const authRoutes = require('../routes/authRoutes');
 const userRoutes = require('../routes/userRoutes');
 const notificationRoutes = require('../routes/notificationRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
};
