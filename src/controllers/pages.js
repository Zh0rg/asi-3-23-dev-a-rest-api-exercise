const Page = require("../db/models/page")
const { NotFoundError, InvalidArgumentError } = require("../../errors")
const forwardAsyncErrors = require("../helpers/forward-async-errors")

exports.getPageBySlug = forwardAsyncErrors(async (req, res) => {
    const page = await Page.findOne({ slug: req.params.slug })

    if (!page) {
        throw new NotFoundError()
    }

    res.send({
        result: page,
    })
})

exports.getPages = forwardAsyncErrors(async (req, res) => {
    const { sort = "_id", limit, offset, ...query } = req.query

    const pages = await Page.find(query).skip(offset).limit(limit).sort(sort)

    res.send({
        result: pages,
    })
})

exports.createPage = forwardAsyncErrors(async (req, res) => {
    const page = new Page({
        ...req.body,
        creator: req.user._id,
    })

    try {
        await page.save()
    } catch (err) {
        if (!err.errors) {
            throw new InvalidArgumentError([err.message])
        }

        throw new InvalidArgumentError(
            Object.values(err.errors).map((e) => e.message)
        )
    }

    res.status(201).send({
        result: page,
    })
})

exports.updatePage = forwardAsyncErrors(async (req, res) => {
    let page = null

    try {
        page = await Page.findByIdAndUpdate(req.params.pageId, req.body, {
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

    if (!page) {
        throw new NotFoundError()
    }

    res.send({
        result: page,
    })
})

exports.deletePage = forwardAsyncErrors(async (req, res) => {
    const deletedPage = await Page.findOneAndDelete({ slug: req.params.slug })

    if (!deletedPage) {
        throw new NotFoundError()
    }

    res.sendStatus(204)
})

exports.getPageCreator = forwardAsyncErrors(async (req, res) => {
    const page = await Page.findOne({ slug: req.params.slug }).populate(
        "creator"
    )

    if (!page) {
        throw new NotFoundError()
    }

    if (!page.creator) {
        throw new NotFoundError()
    }

    res.send({
        result: page.creator,
    })
})
