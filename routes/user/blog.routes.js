const routes = require('express').Router()

const authenticate = require('../../middleware/cheakAuth');
const imageUpload = require('../../middleware/imageUpload');
const { addBlog, deleteBlog, viewAllBlog, updateBlog, deactive, active } = require('../../controllers/user/blog.controller')

routes.post('/addblog', authenticate, imageUpload, addBlog)
routes.delete('/deleteblog/:id', authenticate, deleteBlog)
routes.get('/view-all-blog', authenticate, viewAllBlog)
routes.patch('/updateblog/:id', authenticate, imageUpload, updateBlog)
routes.patch('/blog-deactive/:id', authenticate, deactive)
routes.patch('/blog-active/:id', authenticate, active)

module.exports = routes