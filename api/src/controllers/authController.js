const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
//Register 
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required.' });
        }
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered.' });
        }
        const password_hash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password_hash });
        const token = jwt.sign(
            {
                id: user.id, email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        return res.status(201).json({
            message: 'User registered successfully.',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// Login
const login = async (req, res) => {
    console.log('Login req.body:', req.body); // ⬅️ Add karo
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log('Validation failed');
            return res.status(400).json({ message: 'Email and Password are Required' });
        }
        const user = await User.findOne({
            where: { email }
        });
        console.log('User found:', user);
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password_hash);
        console.log('Password match:', isMatch);
        if (!isMatch) {
            return res.status(401).json({ message: ' Invalid email or password' })
        };
        const token = jwt.sign(
            {
                id: user.id, email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        return res.status(200).json({
            message: 'Login successful.',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
}
// Logout
const logout = async (req, res) => {
    try {
        return res.status(200).json({ message: 'Logged out successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
// Get Current User
const getCurrentUser = async (req, res) => {
    try {
        return res.status(200).json({
            user: {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email,
                avatar_url: req.user.avatar_url,
                is_active: req.user.is_active,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
module.exports = { register, login, logout, getCurrentUser };