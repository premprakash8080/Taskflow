const bcrypt = require('bcryptjs');
const { User, WorkspaceMember, Workspace } = require('../models/index');

// Get My Profile

const getProfile = async (req, res) => {
    try {
        return res.status(200).json({
            User: {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email,
                avatar_url: req.user.avatar_url,
                is_active: req.user.is_active,
            },
        })
    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });

    }
}


// Update My Profile


const updateProfile = async (req, res) => {
    try {
        const { name, avatar_url } = req.body;

        // 1. Kya update karna hai
        const updateData = {};
        if (name) updateData.name = name;
        if (avatar_url) updateData.avatar_url = avatar_url;

        // 2. Update karo
        await User.update(updateData, { where: { id: req.user.id } });

        // 3. Updated user fetch karo
        const updatedUser = await User.findByPk(req.user.id, {
            attributes: ['id', 'name', 'email', 'avatar_url', 'is_active'],
        });

        return res.status(200).json({
            message: 'Profile updated successfully.',
            user: updatedUser,
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


// List Team Members


const listMembers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'avatar_url', 'is_active'],
        });

        return res.status(200).json({ members: users });

    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


// Invite Team Member


const inviteMember = async (req, res) => {
    try {
        const { name, email, password, role, workspace_id } = req.body;

        // 1. Validation
        if (!name || !email || !password || !workspace_id) {
            return res.status(400).json({ message: 'Name, email, password and workspace_id are required.' });
        }

        // 2. Email already exists?
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered.' });
        }

        // 3. Password hash karo
        const password_hash = await bcrypt.hash(password, 10);

        // 4. User banao
        const newUser = await User.create({ name, email, password_hash });

        // 5. Workspace member banao
        await WorkspaceMember.create({
            workspace_id,
            user_id: newUser.id,
            role: role || 'member',
        });

        return res.status(201).json({
            message: 'Member invited successfully.',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: role || 'member',
            },
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


// Update User Role


const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role, workspace_id } = req.body;

        // 1. Validation
        if (!role || !workspace_id) {
            return res.status(400).json({ message: 'Role and workspace_id are required.' });
        }

        // 2. Member dhundo
        const member = await WorkspaceMember.findOne({
            where: { user_id: userId, workspace_id },
        });

        if (!member) {
            return res.status(404).json({ message: 'Member not found in this workspace.' });
        }

        // 3. Role update karo
        await member.update({ role });

        return res.status(200).json({ message: 'Role updated successfully.', role });

    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

module.exports = { getProfile, updateProfile, listMembers, inviteMember, updateUserRole };
