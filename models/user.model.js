const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const usersSchma = sequelize.define('user', {
        id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            set(val) {
                this.setDataValue('password', bcrypt.hashSync(val, 12))
            }
        },
        avtar:{
            type: Sequelize.DataTypes.STRING,
            defaultValue: "uploads/default.png"
        }
    }, {
        tableName: 'user'
    });
    return usersSchma;
}