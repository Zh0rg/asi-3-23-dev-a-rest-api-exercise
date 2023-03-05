const NavMenu = require("../db/models/nav-menu")
const { NotFoundError, InvalidArgumentError } = require("../../errors")
const forwardAsyncErrors = require("../helpers/forward-async-errors")

exports.getMenuByName = forwardAsyncErrors(async (req, res) => {
    const menu = await NavMenu.findOne({ name: req.params.navMenuName })

    if (!menu) {
        throw new NotFoundError()
    }

    res.send({
        result: menu,
    })
})

exports.getMenus = forwardAsyncErrors(async (req, res) => {
    const { sort = "_id", limit, offset, ...query } = req.query

    const menus = await NavMenu.find(query).skip(offset).limit(limit).sort(sort)

    res.send({
        result: menus,
    })
})

exports.createMenu = forwardAsyncErrors(async (req, res) => {
    const menu = new NavMenu(req.body)

    try {
        await menu.save()
    } catch (err) {
        if (!err.errors) {
            throw new InvalidArgumentError([err.message])
        }

        throw new InvalidArgumentError(
            Object.values(err.errors).map((e) => e.message)
        )
    }

    res.status(201).send({
        result: menu,
    })
})

exports.updateMenu = forwardAsyncErrors(async (req, res) => {
    let menu = null

    try {
        menu = await NavMenu.findByIdAndUpdate(
            req.params.navMenuName,
            req.body,
            {
                runValidators: true,
                returnDocument: "after",
            }
        )
    } catch (err) {
        if (!err.errors) {
            throw new InvalidArgumentError([err.message])
        }

        throw new InvalidArgumentError(
            Object.values(err.errors).map((e) => e.message)
        )
    }

    if (!menu) {
        throw new NotFoundError()
    }

    res.send({
        result: menu,
    })
})

exports.deleteMenu = forwardAsyncErrors(async (req, res) => {
    const deletedMenu = await NavMenu.findOneAndDelete({
        name: req.params.navMenuName,
    })

    if (!deletedMenu) {
        throw new NotFoundError()
    }

    res.sendStatus(204)
})
