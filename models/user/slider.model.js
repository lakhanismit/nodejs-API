module.exports = (sequelize, Sequelize) => {
    const sliderSchma = sequelize.define('slider', {
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
        tableName: 'slider'
    });
    return sliderSchma;
}