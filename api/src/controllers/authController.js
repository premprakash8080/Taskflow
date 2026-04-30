const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const Workspace = require("../models/workspaceModel");
const WorkspaceMember = require("../models/workspaceMemberModel");
const { Op } = require("sequelize");

const generateSlug = (name) => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") + "-" + Date.now();
};

const jwtSecret = () => process.env.JWT_SECRET || process.env.JWT_PRIVATE_KEY;

const createDefaultWorkspaceIfNotExists = async (user) => {
    const existingMembership = await WorkspaceMember.findOne({
        where: { user_id: user.id },
    });

    if (existingMembership) {
        return await Workspace.findByPk(existingMembership.workspace_id);
    }

    const workspaceName = `${user.name}'s Workspace`;
    const slug = generateSlug(workspaceName);

    const workspace = await Workspace.create({
        name: workspaceName,
        slug: slug,
        owner_id: user.id,
    });

    await WorkspaceMember.create({
        workspace_id: workspace.id,
        user_id: user.id,
        role: "admin",
    });

    return workspace;
};


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
        const workspace = await createDefaultWorkspaceIfNotExists(user);
        const token = jwt.sign(
            {
                id: user.id, email: user.email
            },
            jwtSecret(),
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
            workspace,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are Required' });
        }
        const user = await User.findOne({
            where: { email }
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: ' Invalid email or password' })
        };
        const token = jwt.sign(
            {
                id: user.id, email: user.email
            },
            jwtSecret(),
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        const workspace = await createDefaultWorkspaceIfNotExists(user);
        return res.status(200).json({
            message: 'Login successful.',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            workspace:workspace,
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

const verifyToken = async (req, res) => {
    try {
        const token = req.body?.token || req.headers.authorization?.split(' ')[1];
        const secret = jwtSecret();

        if (!token) {
            return res.status(400).json({ valid: false, message: 'Token is required.' });
        }

        if (!secret) {
            return res.status(500).json({ valid: false, message: 'JWT secret is not configured.' });
        }

        const decoded = jwt.verify(token, secret);
        const user = await User.findByPk(decoded.id);

        if (!user || !user.is_active) {
            return res.status(401).json({ valid: false, message: 'Invalid token.' });
        }

        return res.status(200).json({
            valid: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar_url: user.avatar_url,
                is_active: user.is_active,
            },
        });
    } catch (error) {
        return res.status(401).json({ valid: false, message: 'Invalid or expired token.' });
    }
};

module.exports = { register, login, logout, getCurrentUser, verifyToken };
