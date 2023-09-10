const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    verifyPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    };
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [9],
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserInfo) => {
                newUserInfo.password = await bcrypt.hash(newUserInfo.password, 10);
                return newUserInfo;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    },
);

module.exports = User;
