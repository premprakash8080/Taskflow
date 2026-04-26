const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Token lo request ke header se
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // 2. "Bearer <token>" se sirf token nikalo
    const token = authHeader.split(' ')[1];

    // 3. Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. DB se user dhundo
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    if (!user.is_active) {
      return res.status(401).json({ message: 'Account is deactivated.' });
    }

    // 5. User ko request mein daalo aur aage bhejo
    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;