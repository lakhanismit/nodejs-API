require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require('../config/db');
const secret = process.env.JWT_SECRET

const checkAuth = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization || !authorization.startsWith('Bearer')) {
        return res.status(401).json({ success: false, msg: `you are not authorized` })
    } else {
        try {
            const token = authorization.split(' ')[1]

            let isToken = await db.user_Session.findOne({
                where: {
                    token
                }
            });
            isToken = isToken.toJSON();
            if (!isToken) {
                return res.status(401).json({ success: false, msg: "unauthorized" });
            }

            jwt.verify(token, secret, (err, decode) => {
                if (err) {
                    console.log(err.message);
                }
                req.user = {
                    id: decode.id,
                    email: decode.email
                }
                next();
            });
        } catch (error) {
            return res.status(401).json({ success: false, msg: error })
        }
    }
}

module.exports = checkAuth