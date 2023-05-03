const express = require('express');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5555
const path = require('path');

const db = require('./config/db');

const cookie = require('cookie-parser');

const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')
const sliderRoutes = require('./routes/user/slider.routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookie())

app.use('/uploads', express.static(path.join('uploads')))

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/slider', sliderRoutes)

app.listen(port, () => console.log(`Server start on port :- ${port}`))