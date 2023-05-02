module.exports = (sequelize, Sequelize) => {
    const userSessionSchema = sequelize.define('userSession', {

        id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        token: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        user_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
        {
            tableName: "userSession"
        });

    return userSessionSchema
}