const jwt = require("jsonwebtoken")

const config = require("../../config")

const User = require("../db/models/user")
const { InvalidCredentialsError } = require("../../errors")

const forwardAsyncErrors = require("../helpers/forward-async-errors")

const login = forwardAsyncErrors(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        throw new InvalidCredentialsError()
    }

    if (!(await user.checkPassword(password))) {
        throw new InvalidCredentialsError()
    }

    const token = jwt.sign(
        {
            payload: {
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
            },
        },
        config.security.jwt.secret,
        {
            expiresIn: config.security.jwt.expiresIn,
        }
    )

    res.send({
        result: token,
    })
})

module.exports = {
    login,
}
