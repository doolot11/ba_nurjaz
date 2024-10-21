const { Schema, model } = require("mongoose");

const requestSchema = new Schema({
    fullName: { type: String, default: "" },
    phone: { type: String, default: "" },
    description: { type: String, default: "" },
    isAnswered: { type: Boolean, default: false },

}, { timestamps: true })

const requestModel = model("request", requestSchema)

module.exports = requestModel
