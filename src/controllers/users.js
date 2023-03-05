const User = require("../db/models/user")
const { NotFoundError, InvalidArgumentError } = require("../../errors")
const forwardAsyncErrors = require("../helpers/forward-async-errors")

exports.getUserById = forwardAsyncErrors(async (req, res) => {
    const user = await User.findById(req.params.userId)

    if (!user) {
        throw new NotFoundError()
    }

    res.send({
        result: user,
    })
})

exports.getUsers = forwardAsyncErrors(async (req, res) => {
    const { sort = "_id", limit, offset, ...query } = req.query

    const users = await User.find(query).skip(offset).limit(limit).sort(sort)

    res.send({
        result: users,
    })
})

exports.createUser = forwardAsyncErrors(async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
    } catch (err) {
        if (!err.errors) {
            throw new InvalidArgumentError([err.message])
        }

        throw new InvalidArgumentError(
            Object.values(err.errors).map((e) => e.message)
        )
    }

    res.status(201).send({
        result: user,
    })
})

exports.updateUser = forwardAsyncErrors(async (req, res) => {
    let user = null

    try {
        user = await User.findByIdAndUpdate(req.params.userId, req.body, {
            runValidators: true,
            returnDocument: "after",
        })
    } catch (err) {
        if (!err.errors) {
            throw new InvalidArgumentError([err.message])
        }

        throw new InvalidArgumentError(
            Object.values(err.errors).map((e) => e.message)
        )
    }

    if (!user) {
        throw new NotFoundError()
    }

    res.send({
        result: user,
    })
})

exports.deleteUser = forwardAsyncErrors(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.userId)

    if (!deletedUser) {
        throw new NotFoundError()
    }

    res.sendStatus(204)
})
