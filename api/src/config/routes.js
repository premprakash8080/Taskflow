/**
 * Import Route files and set in express middleware
 */

exports.set_routes = (app) => {
    const authRoutes = require('../routes/authRoutes');
    const userRoutes = require('../routes/userRoutes');
    const notificationRoutes = require('../routes/notificationRoutes');
    const projectRoutes = require('../routes/projectRoutes');
    const taskRoutes = require('../routes/taskRoutes');


    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/notifications', notificationRoutes);
    app.use('/api/projects', projectRoutes);
    app.use('/api/tasks', taskRoutes);
};
