const routes = require('express').Router()

const authenticate = require('../../middleware/cheakAuth');
const imageUpload = require('../../middleware/imageUpload');
const { addPost, deletePost, viewAllPost, updatePost, deactive, active } = require('../../controllers/user/recentpost.controller')

routes.post('/addpost', authenticate, imageUpload, addPost)
routes.delete('/deletepost/:id', authenticate, deletePost)
routes.get('/view-all-post', authenticate, viewAllPost)
routes.patch('/updatepost/:id', authenticate, imageUpload, updatePost)
routes.patch('/post-deactive/:id', authenticate, deactive)
routes.patch('/post-active/:id', authenticate, active)

module.exports = routes