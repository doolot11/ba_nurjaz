const { mainCardModel, detailCardModel, imageModel } = require("../models/contents")
const path = require('path');

class Content {
    async CreateMainCard(req, res) {
        try {
            const { title, description } = req.body
            const { filename } = req.file
            // const fileName = req.params.fileName;
            // const filePath = path.join(__dirname, 'upload', image);
            console.log(req.file, "req.file");

            const response = await mainCardModel.create({ image: filename, title, description })

            await res.json("Успешно создано!")

        } catch (error) {
            return res.status(400).json("error")
        }
    }
    async addDetailCard(req, res) {
        try {
            const { idMainCard } = req.body
            // const { filename } = req.file
            console.log("filename", req.body, req.file);
            // if (!req.file || !req.file.filename) {
            //     return res.status(400).json({ error: "Image file is required!" });
            // }
            // const imageId = await imageModel.create({ image: filename })
            // console.log(imageId, "imageId");


            const response = await detailCardModel.create({ image: req.file.filename, mainCardId: idMainCard })

            await mainCardModel.findByIdAndUpdate(idMainCard, { $push: { count: response._id } }, { new: true })

            await res.json("Успешно создано!")

        } catch (error) {
            return res.status(400).json("error")
        }
    }

    async getAllMainCards(req, res) {
        try {
            const response = await mainCardModel.find().populate("count")
            
            // console.log(count);
            // response.countOfProd = count

            await res.json(response)
        } catch (error) {
            return res.status(400).json("error")
        }
    }
    async deleteMainCard(req, res) {
        try {
            const { _id } = req.body
            const response = await mainCardModel.findByIdAndDelete(_id)
            if (response) {
                await res.json("Успешно удален!")
            } else {
                return res.status(400).json("delete error")
            }
        } catch (error) {
            return res.status(400).json("error")
        }
    }
}

module.exports = new Content