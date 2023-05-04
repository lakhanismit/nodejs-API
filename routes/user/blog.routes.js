const routes = require('express').Router()

const authenticate = require('../../middleware/cheakAuth');
const imageUpload = require('../../middleware/imageUpload');
const { addBlog, deleteBlog, viewAllBlog } = require('../../controllers/user/blog.controller')

routes.post('/addblog', authenticate, imageUpload, addBlog)
routes.delete('/deleteblog/:id', authenticate, deleteBlog)
routes.get('/view-all-blog', authenticate, viewAllBlog)

module.exports = routes