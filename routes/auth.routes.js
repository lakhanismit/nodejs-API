const routes = require('express').Router()

const authenticate = require('../middleware/cheakAuth');
const { login, logout, forgot, checkOtp, resetPassword } = require('../controllers/auth.controller')

routes.post('/login', login)
routes.get("/logout", authenticate, logout);
routes.post("/forgot", forgot);
routes.post("/checkotp", checkOtp);
routes.patch("/resetpassword", resetPassword);

module.exports = routes