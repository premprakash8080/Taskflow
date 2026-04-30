const { Task, Project, User } = require('../models/index');

const taskInclude = [
  { model: Project, attributes: ['id', 'name', 'color'] },
  { model: User, as: 'assignee', attributes: ['id', 'name', 'avatar_url'] },
];

const listTasks = async (req, res) => {
  try {
    const { project_id, assignee_id } = req.query;
    const where = {};

    if (project_id) where.project_id = project_id;
    if (assignee_id) where.assignee_id = assignee_id;

    const tasks = await Task.findAll({
      where,
      include: taskInclude,
      order: [['order_index', 'ASC'], ['createdAt', 'ASC']],
    });

    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const {
      name,
      description,
      status,
      priority,
      due_date,
      project_id,
      assignee_id,
      section_id,
      subtasks,
      comments,
    } = req.body;

    if (!name || !project_id) {
      return res.status(400).json({ message: 'Name and project_id are required.' });
    }

    const project = await Project.findByPk(project_id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    const maxOrder = await Task.max('order_index', {
      where: { project_id, section_id: section_id || 'col_backlog' },
    });

    const task = await Task.create({
      name,
      description,
      status: status || 'todo',
      priority: priority || 'none',
      due_date,
      project_id,
      assignee_id: assignee_id || null,
      section_id: section_id || 'col_backlog',
      order_index: Number.isFinite(maxOrder) ? maxOrder + 1 : 0,
      subtasks: subtasks || [],
      comments: comments || [],
      completed: status === 'completed',
      created_by: req.user.id,
    });

    const created = await Task.findByPk(task.id, { include: taskInclude });
    return res.status(201).json({ message: 'Task created successfully.', task: created });
  } catch (error) {
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    const allowed = [
      'name',
      'description',
      'status',
      'priority',
      'due_date',
      'assignee_id',
      'section_id',
      'order_index',
      'subtasks',
      'comments',
      'completed',
    ];
    const updateData = {};

    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        updateData[key] = req.body[key];
      }
    }

    if (Object.prototype.hasOwnProperty.call(updateData, 'completed')) {
      updateData.status = updateData.completed ? 'completed' : (updateData.status || 'todo');
    } else if (updateData.status) {
      updateData.completed = updateData.status === 'completed';
    }

    await task.update(updateData);

    const updated = await Task.findByPk(task.id, { include: taskInclude });
    return res.status(200).json({ message: 'Task updated successfully.', task: updated });
  } catch (error) {
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    await task.destroy();
    return res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

module.exports = { listTasks, createTask, updateTask, deleteTask };
