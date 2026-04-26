const { DataTypes } = require('sequelize');
const database = require("../config/database");
const {TABLE_NAME_USERS,} = require("../config/table_names");

const User = database.define(TABLE_NAME_USERS, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },

},
    {
        tableName: TABLE_NAME_USERS,
        timestamps: true,
    });

module.exports = User;