const routes = require('express').Router()

const authenticate = require('../middleware/cheakAuth');
const {login, logout} = require('../controllers/auth.controller')

routes.post('/login', login)
routes.get("/logout",authenticate,logout);

module.exports = routes