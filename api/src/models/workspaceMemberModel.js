const { DataTypes } = require('sequelize');
const database = require("../config/database");
const {TABLE_NAME_WORKSPACEMEMBER} = require("../config/table_names");

const WorkspaceMember = database.define(TABLE_NAME_WORKSPACEMEMBER, {
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
  tableName: TABLE_NAME_WORKSPACEMEMBER,
  timestamps: false,
});

module.exports = WorkspaceMember;