const mongoose = require("mongoose")
const { Schema } = mongoose

const navMenuSchema = new Schema(
    {
        name: {
            type: String,
            match: [/^[\p{L} -]+$/u, "Invalid menu name"],
            unique: true,
            required: true,
        },
        parent: {
            type: String,
            match: [/^[\p{L} -]+$/u, "Invalid menu name"],
        },
    },
    { versionKey: false }
)

module.exports = navMenuSchema
