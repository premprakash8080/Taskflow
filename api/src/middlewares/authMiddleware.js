const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || process.env.JWT_PRIVATE_KEY;

    if (!secret) {
      return res.status(500).json({ message: 'JWT secret is not configured.' });
    }

    const decoded = jwt.verify(token, secret);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    if (!user.is_active) {
      return res.status(401).json({ message: 'Account is deactivated.' });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
