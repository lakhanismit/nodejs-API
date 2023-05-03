const routes = require('express').Router()

const authenticate = require('../../middleware/cheakAuth');
const imageUpload = require('../../middleware/imageUpload');
const { addSlider, deleteSlider, viewAllSlider, updateSlider, deactive, active } = require('../../controllers/user/slider.controller');

routes.post('/addslider', authenticate, imageUpload, addSlider)
routes.delete('/deleteslider/:id', authenticate, deleteSlider)
routes.get('/view-all-slider', authenticate, viewAllSlider)
routes.patch('/updateslider/:id', authenticate, imageUpload, updateSlider)
routes.patch('/slider-deactive/:id', authenticate, deactive)
routes.patch('/slider-active/:id', authenticate, active)

module.exports = routes