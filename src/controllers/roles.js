const Role = require("../db/models/role")
const { NotFoundError, InvalidArgumentError } = require("../../errors")
const forwardAsyncErrors = require("../helpers/forward-async-errors")

exports.getRoleByName = forwardAsyncErrors(async (req, res) => {
    const role = await Role.findOne({ name: req.params.name })

    if (!role) {
        throw new NotFoundError()
    }

    res.send({
        result: role,
    })
})

exports.getRoles = forwardAsyncErrors(async (req, res) => {
    const { sort = "_id", limit, offset, ...query } = req.query

    const roles = await Role.find(query).skip(offset).limit(limit).sort(sort)

    res.send({
        result: roles,
    })
})

exports.createRole = forwardAsyncErrors(async (req, res) => {
    const role = new Role(req.body)

    try {
        await role.save()
    } catch (err) {
        if (!err.errors) {
            throw new InvalidArgumentError([err.message])
        }

        throw new InvalidArgumentError(
            Object.values(err.errors).map((e) => e.message)
        )
    }

    res.status(201).send({
        result: role,
    })
})

exports.updateRole = forwardAsyncErrors(async (req, res) => {
    let role = null

    try {
        role = await Role.findByIdAndUpdate(req.params.RoleName, req.body, {
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

    if (!role) {
        throw new NotFoundError()
    }

    res.send({
        result: role,
    })
})

exports.deleteRole = forwardAsyncErrors(async (req, res) => {
    const deletedRole = await Role.findOneAndDelete({
        name: req.params.name,
    })

    if (!deletedRole) {
        throw new NotFoundError()
    }

    res.sendStatus(204)
})
