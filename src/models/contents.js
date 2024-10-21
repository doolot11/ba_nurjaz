const { Schema, model } = require("mongoose");

const mainCardSchema = new Schema({
    title: { type: String, default: "" },
    count: [{ type: Schema.Types.ObjectId, ref: 'detailCard' }],
    description: { type: String, default: "" },
    isActive: { type: Boolean, default: false },
    image: { type: String, default: "" },

}, { timestamps: true })

const mainCardModel = model("mainCard", mainCardSchema)

// ------------------------------------------------------------------

const detailCardSchema = new Schema({
    title: { type: String, default: "" },
    mainCardId: { type: Schema.Types.ObjectId, ref: 'mainCard' },
    isActive: { type: Boolean, default: false },
    image: { type: String, default: ""},
}, { timestamps: true })

const imageSchema = new Schema({
    image: { type: String },

}, { timestamps: true })



const detailCardModel = model("detailCard", detailCardSchema)
const imageModel = model("image", imageSchema)

module.exports = { mainCardModel, detailCardModel, imageModel }
