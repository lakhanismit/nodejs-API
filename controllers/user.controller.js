const db = require('../config/db');
const userModel = db.User

const path = require("path");
const fs = require('fs');
let imgPath = path.join("uploads")

const addUser = async (req, res) => {
    try {
        const { body: { name, email, password } } = req
        const data = await userModel.create({ name, email, password })
        res.status(201).json({ success: true, data: data, msg: `data is insert` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `data not inser` })
    }
}

const viewUser = async (req, res) => {
    try {
        const data = await userModel.findAll({})
        res.status(200).json({ success: true, data: data, msg: `data is view` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `data not view` })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { params: { id } } = req
        const data = await userModel.destroy({ where: { id } })
        if (!data) {
            return res.status(404).json({ success: false, msg: `${id} is not register as id` })
        }
        res.status(200).json({ success: true, msg: `User is deleted of id :- ${id}` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `data not delete` })
    }
}

const updateUser = async (req, res) => {
    try {
        const { params: { id }, body: { name, email, password } } = req
        if (req.file) {
            const oneData = await userModel.findOne({ where: { id } })
            
            if (oneData.avtar !== "uploads/default.png") {
                fs.unlinkSync(oneData.avtar)
            }

            let avtar = `${imgPath}/${req.file.filename}`;
            const data = await userModel.update({ name, email, password, avtar }, { where: { id } });

            return res.status(200).json({ success: true, data: data, msg: `data is update on id :- ${id}` })

        } else {
            const data = await userModel.update({ name, email, password }, { where: { id } })
            if (!data) {
                return res.status(404).json({ success: false, msg: `${id} is not register as id` })
            }
            res.status(200).json({ success: true, data: data, msg: `data is update on id :- ${id}` })
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: `data not update` + error.message })
    }
}

const findOneUser = async (req, res) => {
    try {
        const { params: { id } } = req
        const data = await userModel.findOne({ where: { id } })
        if (!data) {
            return res.status(404).json({ success: false, msg: `data not find` })
        }
        res.status(200).json({ success: true, data: data, msg: `data find on id:- ${id}` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `not find` })
    }
}

module.exports = { addUser, viewUser, deleteUser, updateUser, findOneUser }