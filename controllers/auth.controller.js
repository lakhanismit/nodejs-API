require('dotenv').config()
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const authModel = db.User
const bcrypt = require('bcrypt');
const secret = process.env.JWT_SECRET
const nodemailer = require('nodemailer');

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

const forgot = async (req, res) => {
    try {
        const { body: { email } } = req;

        const oneData = await authModel.findOne({ where: { email } });
        const id = oneData.id;
        if (!oneData) {
            return res.status(404).json({ success: false, msg: "Email Not Found" });
        } else {
            let otp = Math.floor(Math.random() * 1000000);

            let obj = { email, otp, id }
            const transpoter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: "smitlakhani2062002@gmail.com",
                    pass: "tequaszrhrezreqw"
                }
            });

            let mailoptions = {
                from: "smitlakhani2062002@gmail.com",
                to: email,
                subject: "For Your Reset Password Mail Form Final_Api",
                text: `Your One Time Password(OTP) is :- ${otp}`,
            };

            transpoter.sendMail(mailoptions, (err, info) => {
                if (err) {
                    console.log(err.message);
                } else {
                    res.cookie("otp_obj", obj);
                    console.log(`Email Sent Successfully To ${email}_${info.response}`);
                    return res.status(200).json({ success: true, msg: "Otp send Successfully" });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error in server at Forgot Password" + error.message });
    }
}

const checkOtp = async (req, res) => {
    try {
        const { body: { otp } } = req;
        console.log(req.cookies.otp_obj.otp);
        if(otp == req.cookies.otp_obj.otp){
            console.log("done");
        }

    } catch (error) {
        res.status(500).json({ success: false, msg: "Error in server at chackOtp" + error.message });
    }
}

module.exports = { login, logout, forgot, checkOtp }