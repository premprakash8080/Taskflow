const { DataTypes } = require('sequelize');
const database = require('../config/database');

const Project = database.define('Project', {
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
    type: DataTypes.ENUM('active', 'on_track', 'at_risk', 'off_track', 'completed', 'archived'),
    defaultValue: 'active',
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '#6366f1',
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  workspace_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'projects',
  timestamps: true,
});

module.exports = Project;
