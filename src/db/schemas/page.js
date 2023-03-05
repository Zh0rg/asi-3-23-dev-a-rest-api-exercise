const mongoose = require("mongoose")
const { Schema } = mongoose

const pageSchema = new Schema(
    {
        title: {
            type: String,
            minLength: 10,
            required: true,
            index: true,
        },
        content: {
            type: String,
            minLength: 100,
            required: true,
        },
        slug: {
            type: String,
            match: /[a-z][a-z-]*[a-z]/,
            unique: true,
            required: true,
        },
        creator: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        contributors: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        ],
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
        },
    },
    { versionKey: false }
)

module.exports = pageSchema
