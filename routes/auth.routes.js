const routes = require('express').Router()

const authenticate = require('../middleware/cheakAuth');
const { login, logout, forgot, checkOtp } = require('../controllers/auth.controller')

routes.post('/login', login)
routes.get("/logout", authenticate, logout);
routes.post("/forgot", forgot);
routes.post("/checkotp", checkOtp);

module.exports = routes