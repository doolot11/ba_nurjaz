const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: { type: String, default: "" },
    password: { type: String, default: "" },
}, { timestamps: true })

const userModel = model("user", userSchema)

module.exports = userModel
