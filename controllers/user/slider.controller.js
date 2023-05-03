const db = require('../../config/db');
const sliderModel = db.Slider

const path = require("path");
const fs = require('fs');
let imgPath = path.join("uploads")

const addSlider = async (req, res) => {
    try {
        let avtar = `${imgPath}/${req.file.filename}`;
        const data = await sliderModel.create(Object.assign({ avtar }, req.body))
        res.status(201).json({ success: true, data: data, msg: `Slider data is insert` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `Slider data not inser ${error.message}` })
    }
}

const deleteSlider = async (req, res) => {
    try {
        const { params: { id } } = req
        const oneData = await sliderModel.findOne({ where: { id } })
        const data = await sliderModel.destroy({ where: { id } })
        if (oneData) {
            fs.unlinkSync(oneData.avtar)
        }
        if (!data) {
            return res.status(404).json({ success: false, msg: `${id} is not register as id` })
        }
        res.status(201).json({ success: true, data: data, msg: `Slider data is delete` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `Slider data not inser  ${error.message}` })
    }
}

const viewAllSlider = async (req, res) => {
    try {
        const data = await sliderModel.findAll({})
        res.status(200).json({ success: true, data: data, msg: `All Slider data is view` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `Slider data not inser  ${error.message}` })
    }
}

const updateSlider = async (req, res) => {
    try {
        const { params: { id }, body: { title, subtitle, avtar } } = req
        if (req.file) {
            const oneData = await sliderModel.findOne({ where: { id } })
            if (oneData) {
                fs.unlinkSync(oneData.avtar)
            }

            let avtar = `${imgPath}/${req.file.filename}`;
            const data = await sliderModel.update({ title, subtitle, avtar }, { where: { id } });

            return res.status(200).json({ success: true, data: data, msg: `Slider data is update on id :- ${id}` })

        } else {
            const data = await sliderModel.update({ title, subtitle, avtar }, { where: { id } })
            if (!data) {
                return res.status(404).json({ success: false, msg: `${id} is not register as id` })
            }
            res.status(200).json({ success: true, data: data, msg: `Slider data is update on id :- ${id}` })
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: `Slider data is not update` + error.message })
    }
}

const deactive = async (req, res) => {
    try {
        const { params: { id } } = req
        await sliderModel.update({ status: '0' }, { where: { id } })
        res.status(200).json({ success: true, msg: `Slider data is deactived on id :- ${id}` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `Slider data is not deactive` + error.message })
    }
}

const active = async (req, res) => {
    try {
        const { params: { id } } = req
        await sliderModel.update({ status: '1' }, { where: { id } })
        res.status(200).json({ success: true, msg: `Slider data is actived on id :- ${id}` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `Slider data is not active` + error.message })
    }
}

module.exports = { addSlider, deleteSlider, viewAllSlider, updateSlider, deactive, active }