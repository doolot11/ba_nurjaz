const mongoose = require("mongoose");
const requestModel = require("../models/requests");
const userModel = require("../models/users");


class Request {
    async getRequest(req, res) {
        try {
            const { fullName, phone, description } = req.body
            const response = await requestModel.create({ fullName, phone, description })
            await res.json(response)
        } catch (error) {
            return res.status(400).json("error")
        }
    }
    async getAllReq(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 30;  // Number of items per page
            const skip = (page - 1) * limit;

            const requests = await requestModel.find().skip(skip).limit(limit).sort({ createdAt: -1 })
            const count = await requestModel.countDocuments()

            await res.json({ result: requests, page: page, limit: limit, count })
        } catch (error) {
            return res.status(400).json("error")
        }
    }
    async signIn(req, res) {
        try {
            const { username, password } = req.body

            const requests = await userModel.findOne({ username, password })
            if (!requests) {
                return res.status(400).json("error")
            }
            await res.json(requests)
        } catch (error) {
            return res.status(400).json("error")
        }
    }
    async deleteRequest(req, res) {
        try {
            // const objectId = mongoose.Types.ObjectId(req.body._id)
            // console.log(objectId, "objectId");

            const result = await requestModel.findByIdAndDelete(req.body._id)
            console.log(result);

            if (result) {
                return res.json('User successfully deleted');
            } else {
                return res.status(400).json('User not found or already deleted');
            }

        } catch (error) {
            return res.status(400).json("error: deleteRequest")
        }
    }
    async isAnsweredRequest(req, res) {
        try {
            const result = await requestModel.findByIdAndUpdate(req.body._id, { isAnswered: true }, { new: true })
            if (result) {
                return res.json('User successfully updated');
            } else {
                return res.status(400).json('User not found or already updated');
            }

        } catch (error) {
            return res.status(400).json("error: isAnsweredRequest")
        }
    }
}

module.exports = new Request