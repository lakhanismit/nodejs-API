require('dotenv').config()
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const authModel = db.User
const bcrypt = require('bcrypt');
const secret = process.env.JWT_SECRET

const login = async (req, res) => {
    try {
        const { body: { email, password } } = req
        const isUser = await authModel.findOne({ where: { email } })
        if (!isUser) {
            return res.status(404).json({ success: false, msg: `user not found ${error.message}` })
        }
        if (!bcrypt.compareSync(password, isUser.password)) {
            return res.status(400).json({ success: false, msg: `password not match` })
        }
        const payload = {
            id: isUser.id,
            email: isUser.email
        }
        const asscessToken = jwt.sign(payload, secret, { expiresIn: '1d' })

        await db.user_Session.create({ token: asscessToken, user_id: isUser.id });

        res.status(200).json({ success: true, msg: `user logged in successfully`, token: asscessToken })
    } catch (error) {
        res.status(500).json({ success: false, msg: `somthing went wrong` })
    }
}

const logout = async (req, res) => {
    try {
        const { user: { id } } = req;
        await db.user_Session.destroy({
            where: { user_id: id }
        });

        res.status(200).json({ success: true, msg: "Token Delete Successfully and User Logged out Successfully", });

    } catch (error) {
        res.status(500).json({ success: false, msg: "Error in server at logout" + error.message });
    }
}

module.exports = { login, logout }