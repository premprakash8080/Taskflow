const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const WorkspaceMember = sequelize.define('WorkspaceMember', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  workspace_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'manager', 'member'),
    allowNull: false,
    defaultValue: 'member',
  },
  joined_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'workspace_members',
  timestamps: false,
});

module.exports = WorkspaceMember;