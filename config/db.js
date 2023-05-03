require('dotenv').config()
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
}); 

// const checkConnection = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }
// checkConnection()

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// User model
db.User = require('../models/user.model')(sequelize, Sequelize)

// User session model
db.user_Session = require('../models/userSession.model')(sequelize, Sequelize)
// User relation ship
db.User.hasMany(db.user_Session, { foreignKey: "user_id" })
db.user_Session.belongsTo(db.User, { foreignKey: "user_id" });

// Add slider
db.Slider = require('../models/user/slider.model')(sequelize, Sequelize)

// Add Recent post
db.RecentPost = require('../models/user/recentpost.model')(sequelize, Sequelize)


// db.sequelize.sync({force : false})

module.exports = db