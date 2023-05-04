module.exports = (sequelize, Sequelize) => {
    const postSchma = sequelize.define('blog', {
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        avtar: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        tableName: 'blog'
    });
    return postSchma;
}