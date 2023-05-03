const db = require('../../config/db');
const recentPostModel = db.RecentPost

const path = require("path");
const fs = require('fs');
let imgPath = path.join("uploads")

const addPost = async (req, res) => {
    try {
        let avtar = `${imgPath}/${req.file.filename}`;
        const data = await recentPostModel.create(Object.assign({ avtar }, req.body))
        res.status(201).json({ success: true, data: data, msg: `Post data is insert` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `Post data not inser ${error.message}` })
    }
}

const deletePost = async (req, res) => {
    try {
        const { params: { id } } = req
        const oneData = await recentPostModel.findOne({ where: { id } })
        const data = await recentPostModel.destroy({ where: { id } })
        if (oneData) {
            fs.unlinkSync(oneData.avtar)
        }
        if (!data) {
            return res.status(404).json({ success: false, msg: `${id} is not register as id` })
        }
        res.status(201).json({ success: true, data: data, msg: `Post data is delete` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `Post data not inser  ${error.message}` })
    }
}

const viewAllPost = async (req, res) => {
    try {
        const data = await recentPostModel.findAll({})
        res.status(200).json({ success: true, data: data, msg: `All Post data is view` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `Post data not inser  ${error.message}` })
    }
}

const updatePost = async (req, res) => {
    try {
        const { params: { id }, body: { title, subtitle, avtar } } = req
        if (req.file) {
            const oneData = await recentPostModel.findOne({ where: { id } })
            if (oneData) {
                fs.unlinkSync(oneData.avtar)
            }

            let avtar = `${imgPath}/${req.file.filename}`;
            const data = await recentPostModel.update({ title, subtitle, avtar }, { where: { id } });

            return res.status(200).json({ success: true, data: data, msg: `Post data is update on id :- ${id}` })

        } else {
            const data = await recentPostModel.update({ title, subtitle, avtar }, { where: { id } })
            if (!data) {
                return res.status(404).json({ success: false, msg: `${id} is not register as id` })
            }
            res.status(200).json({ success: true, data: data, msg: `Post data is update on id :- ${id}` })
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: `Post data is not update` + error.message })
    }
}

const deactive = async (req, res) => {
    try {
        const { params: { id } } = req
        await recentPostModel.update({ status: '0' }, { where: { id } })
        res.status(200).json({ success: true, msg: `Post data is deactived on id :- ${id}` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `Post data is not deactive` + error.message })
    }
}

const active = async (req, res) => {
    try {
        const { params: { id } } = req
        await recentPostModel.update({ status: '1' }, { where: { id } })
        res.status(200).json({ success: true, msg: `Post data is actived on id :- ${id}` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `Post data is not active` + error.message })
    }
}

module.exports = { addPost, deletePost, viewAllPost, updatePost, deactive, active }