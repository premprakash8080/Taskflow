const { Op } = require('sequelize');
const { Project, ProjectMember, User, Task } = require('../models/index');

// ─────────────────────────────────────────
// List Projects
// ─────────────────────────────────────────
const listProjects = async (req, res) => {
    try {
        const { workspace_id } = req.query;

        const whereClause = {};
        if (workspace_id) {
            whereClause.workspace_id = workspace_id;
        } else {
            whereClause.owner_id = req.user.id;
        }

        const projects = await Project.findAll({
            where: whereClause,
            include: [
                { model: User, as: 'owner', attributes: ['id', 'name', 'avatar_url'] },
            ],
            order: [['createdAt', 'DESC']],
        });

        return res.status(200).json({ projects });
    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
// ─────────────────────────────────────────
// Create Project
// ─────────────────────────────────────────
const createProject = async (req, res) => {
    try {
        const { name, description, color, due_date, workspace_id, status } = req.body;

        if (!name || !workspace_id) {
            return res.status(400).json({ message: 'Name and workspace_id are required.' });
        }

        // 1. Project banao
        const project = await Project.create({
            name,
            description,
            color: color || '#6366f1',
            due_date,
            workspace_id,
            owner_id: req.user.id,
            status: status || 'on_track',
        });
        await ProjectMember.create({
            project_id: project.id,
            user_id: req.user.id,
            role: 'admin',
        });

        return res.status(201).json({
            message: 'Project created successfully.',
            project,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// ─────────────────────────────────────────
// Get Project
// ─────────────────────────────────────────
const getProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findOne({
            where: { id: projectId },
            include: [
                { model: User, as: 'owner', attributes: ['id', 'name', 'avatar_url'] },
                {
                    model: User,
                    as: 'members',
                    attributes: ['id', 'name', 'avatar_url'],
                    through: { attributes: ['role'] },
                },
            ],
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        return res.status(200).json({ project });
    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// ─────────────────────────────────────────
// Update Project
// ─────────────────────────────────────────
const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { name, description, status, color, due_date } = req.body;

        const project = await Project.findOne({ where: { id: projectId } });

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (status) updateData.status = status;
        if (color) updateData.color = color;
        if (due_date) updateData.due_date = due_date;

        await project.update(updateData);

        return res.status(200).json({
            message: 'Project updated successfully.',
            project,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// ─────────────────────────────────────────
// Delete Project
// ─────────────────────────────────────────
const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findOne({ where: { id: projectId } });

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        // Sirf owner delete kar sakta hai
        if (project.owner_id !== req.user.id) {
            return res.status(403).json({ message: 'Only owner can delete this project.' });
        }

        await project.destroy();

        return res.status(200).json({ message: 'Project deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// ─────────────────────────────────────────
// Get Project Members
// ─────────────────────────────────────────
const getProjectMembers = async (req, res) => {
    try {
        const { projectId } = req.params;

        const members = await ProjectMember.findAll({
            where: { project_id: projectId },
            include: [
                { model: User, attributes: ['id', 'name', 'email', 'avatar_url'] },
            ],
        });

        return res.status(200).json({ members });
    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// ─────────────────────────────────────────
// Add Project Member
// ─────────────────────────────────────────
const addProjectMember = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { user_id, email, role } = req.body;
        let memberUserId = user_id;

        if (!memberUserId && email) {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'User not found for this email.' });
            }
            memberUserId = user.id;
        }

        if (!memberUserId) {
            return res.status(400).json({ message: 'user_id or email is required.' });
        }

        // Already member hai?
        const existing = await ProjectMember.findOne({
            where: { project_id: projectId, user_id: memberUserId },
        });

        if (existing) {
            return res.status(409).json({ message: 'User is already a member.' });
        }

        const member = await ProjectMember.create({
            project_id: projectId,
            user_id: memberUserId,
            role: role || 'member',
        });

        const created = await ProjectMember.findByPk(member.id, {
            include: [
                { model: User, attributes: ['id', 'name', 'email', 'avatar_url'] },
            ],
        });

        return res.status(201).json({
            message: 'Member added successfully.',
            member: created,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// ─────────────────────────────────────────
// Remove Project Member
// ─────────────────────────────────────────
const removeProjectMember = async (req, res) => {
    try {
        const { projectId, userId } = req.params;

        const member = await ProjectMember.findOne({
            where: { project_id: projectId, user_id: userId },
        });

        if (!member) {
            return res.status(404).json({ message: 'Member not found.' });
        }

        await member.destroy();

        return res.status(200).json({ message: 'Member removed successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// ─────────────────────────────────────────
// Get Project Metrics
// ─────────────────────────────────────────
const getProjectMetrics = async (req, res) => {
    try {
        const { projectId } = req.params;

        const now = new Date();
        const weekEnd = new Date();
        weekEnd.setDate(now.getDate() + 7);

        const totalTasks = await Task.count({ where: { project_id: projectId } });
        const completedTasks = await Task.count({ where: { project_id: projectId, completed: true } });
        const overdueTasks = await Task.count({
            where: {
                project_id: projectId,
                completed: false,
                due_date: { [Op.lt]: now },
            },
        });
        const dueThisWeek = await Task.count({
            where: {
                project_id: projectId,
                completed: false,
                due_date: { [Op.between]: [now, weekEnd] },
            },
        });

        const metrics = {
            total_tasks: totalTasks,
            completed_tasks: completedTasks,
            overdue_tasks: overdueTasks,
            due_this_week: dueThisWeek,
            progress_percentage: totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0,
        };

        return res.status(200).json({ metrics });
    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

module.exports = {
    listProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject,
    getProjectMembers,
    addProjectMember,
    removeProjectMember,
    getProjectMetrics,
};
