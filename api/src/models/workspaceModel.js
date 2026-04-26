const { DataTypes } = require('sequelize');
const database = require("../config/database");
const {TABLE_NAME_WORKSPACES} = require("../config/table_names");

const Workspace = database.define(TABLE_NAME_WORKSPACES, {
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
  tableName: TABLE_NAME_WORKSPACES,
  timestamps: true,
});

module.exports = Workspace;