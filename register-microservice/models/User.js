const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true
});

// Definir la función de asociación
User.associate = (models) => {
    User.belongsToMany(models.User, {
        as: 'Followers',
        through: 'UserFollowers',
        foreignKey: 'followingId',
        otherKey: 'followerId'
    });

    User.belongsToMany(models.User, {
        as: 'Following',
        through: 'UserFollowers',
        foreignKey: 'followerId',
        otherKey: 'followingId'
    });
};

module.exports = User;
