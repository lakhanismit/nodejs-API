module.exports = (sequelize, Sequelize) => {
    const sliderSchma = sequelize.define('recent-post', {
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        subtitle: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        avtar:{
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'recent-post'
    });
    return sliderSchma;
}