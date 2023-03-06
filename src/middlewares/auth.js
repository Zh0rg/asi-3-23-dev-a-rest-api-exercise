const config = require("../../config")
const jwt = require("jsonwebtoken")

const forwardAsyncErrors = require("../helpers/forward-async-errors")
const hasPermission = require("../helpers/has-permission")

const {
    InvalidCredentialsError,
    InvalidAccessError,
    InvalidSessionError,
} = require("../../errors")

const User = require("../db/models/user")

const defaultUser = {
    firstName: "Anonymous",
    lastName: "Mister",
    role: "default",
}

exports.isAuthenticated = (allowPublic) =>
    forwardAsyncErrors(async (req, res, next) => {
        const { authorization } = req.headers

        if (!authorization) {
            if (!allowPublic) {
                throw new InvalidCredentialsError()
            }

            req.user = defaultUser
            next()

            return
        }

        const token = authorization.split(" ")[1]

        if (!token) {
            throw new InvalidCredentialsError()
        }

        try {
            const { id } = jwt.verify(token, config.security.jwt.secret).payload
                .user

            const user = await User.findById(id)

            if (!user && !allowPublic) {
                throw new InvalidSessionError()
            }

            req.user = user
            next()
        } catch (err) {
            throw new InvalidSessionError()
        }
    })

exports.hasPermission = ({ resource, actions }) =>
    forwardAsyncErrors(async (req, res, next) => {
        const permission = actions.reduce(
            (result, action) =>
                result ||
                hasPermission({ role: req.user.role, resource, action }),
            false
        )

        if (!permission) {
            throw new InvalidAccessError()
        }

        next()
    })
