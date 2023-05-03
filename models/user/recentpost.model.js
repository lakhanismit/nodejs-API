module.exports = (sequelize, Sequelize) => {
    const postSchma = sequelize.define('recent-post', {
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        subtitle: {
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
        tableName: 'recent-post'
    });
    return postSchma;
}