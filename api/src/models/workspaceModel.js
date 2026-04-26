const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Workspace = sequelize.define('Workspace', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'workspaces',
  timestamps: true,
});

module.exports = Workspace;