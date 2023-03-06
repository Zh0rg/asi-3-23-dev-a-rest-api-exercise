const bcryptjs = require("bcryptjs")
const mongoose = require("mongoose")
const { Schema } = mongoose

const config = require("../../../config")

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            match: [
                /^(?=.*[^\p{L}0-9])(?=.*[0-9])(?=.*\p{Lu})(?=.*\p{Ll}).{8,}$/u,
                "Password must be at least 8 chars & contain at least one of each: lower case, upper case, digit, special char.",
            ],
            required: true,
        },
        firstName: {
            type: String,
            match: [/^[\p{L} -]+$/u, "First name is invalid"],
            required: true,
        },
        lastName: {
            type: String,
            match: [/^[\p{L} -]+$/u, "Last name is invalid"],
            required: true,
        },
        role: {
            type: String,
            enum: {
                values: ["admin", "manager", "editor"],
                message: "{VALUE} is not a valid role",
            },
            default: "editor",
        },
    },
    { versionKey: false }
)

userSchema.methods.checkPassword = async function checkPassword(pass) {
    return bcryptjs.compare(pass, this.password)
}

userSchema.pre("save", async function hashPassword(next) {
    if (!this.isModified("password")) {
        return next()
    }

    this.password = await bcryptjs.hash(
        this.password,
        config.security.password.rounds
    )
})

module.exports = userSchema
