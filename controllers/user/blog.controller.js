const db = require('../../config/db');
const blogModel = db.Blog

const path = require("path");
const fs = require('fs');
let imgPath = path.join("uploads")

const addBlog = async (req, res) => {
    try {
        let avtar = `${imgPath}/${req.file.filename}`;
        const data = await blogModel.create(Object.assign({ avtar }, req.body))
        res.status(201).json({ success: true, data: data, msg: `Blog data is insert` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `Blog data not inser ${error.message}` })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { params: { id } } = req
        const oneData = await blogModel.findOne({ where: { id } })
        const data = await blogModel.destroy({ where: { id } })
        if (oneData) {
            fs.unlinkSync(oneData.avtar)
        }
        if (!data) {
            return res.status(404).json({ success: false, msg: `${id} is not register as id` })
        }
        res.status(201).json({ success: true, data: data, msg: `Blog data is delete` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `Blog data not inser  ${error.message}` })
    }
}

const viewAllBlog = async (req, res) => {
    try {
        const data = await blogModel.findAll({})
        res.status(200).json({ success: true, data: data, msg: `All Blog data is view` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `Blog data not inser  ${error.message}` })
    }
}

const updateBlog = async (req, res) => {
    try {
        const { params: { id }, body: { title, description, date, author, avtar } } = req
        if (req.file) {
            const oneData = await blogModel.findOne({ where: { id } })
            if (oneData) {
                fs.unlinkSync(oneData.avtar)
            }

            let avtar = `${imgPath}/${req.file.filename}`;
            const data = await blogModel.update({ title, description, date, author, avtar }, { where: { id } });

            return res.status(200).json({ success: true, data: data, msg: `Blog data is update on id :- ${id}` })

        } else {
            const data = await blogModel.update({ title, description, date, author, avtar }, { where: { id } })
            if (!data) {
                return res.status(404).json({ success: false, msg: `${id} is not register as id` })
            }
            res.status(200).json({ success: true, data: data, msg: `Blog data is update on id :- ${id}` })
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: `Blog data is not update` + error.message })
    }
}

const deactive = async (req, res) => {
    try {
        const { params: { id } } = req
        await blogModel.update({ status: '0' }, { where: { id } })
        res.status(200).json({ success: true, msg: `Blog data is deactived on id :- ${id}` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `Blog data is not deactive` + error.message })
    }
}

const active = async (req, res) => {
    try {
        const { params: { id } } = req
        await blogModel.update({ status: '1' }, { where: { id } })
        res.status(200).json({ success: true, msg: `Blog data is actived on id :- ${id}` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `Blog data is not active` + error.message })
    }
}

module.exports = { addBlog, deleteBlog, viewAllBlog, updateBlog, deactive, active }