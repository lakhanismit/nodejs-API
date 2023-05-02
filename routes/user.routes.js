const routes = require('express').Router()

const { addUser, viewUser, deleteUser, updateUser, findOneUser } = require('../controllers/user.controller');
const checkAuth = require('../middleware/cheakAuth');

const imageUpoald = require('../middleware/imageUpload');

routes.post('/create-user', addUser)
routes.get('/view-user', viewUser)
routes.delete('/delete-user/:id', checkAuth, deleteUser)
routes.patch('/update-user/:id', checkAuth, imageUpoald, updateUser)
routes.get('/one-user/:id', findOneUser)

module.exports = routes 