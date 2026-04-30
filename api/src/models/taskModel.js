const { DataTypes } = require('sequelize');
const database = require('../config/database');

const Task = database.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('todo', 'in_progress', 'completed'),
    allowNull: false,
    defaultValue: 'todo',
  },
  priority: {
    type: DataTypes.ENUM('none', 'low', 'medium', 'high'),
    allowNull: false,
    defaultValue: 'none',
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  section_id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'col_backlog',
  },
  order_index: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  subtasks: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
  },
  comments: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  assignee_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'tasks',
  timestamps: true,
});

module.exports = Task;
