const router = require("express").Router()
const pageCtrl = require("../controllers/pages")

const { isAuthenticated, hasPermission } = require("../middlewares/auth")

const yup = require("yup")
const validators = require("../helpers/validators")
const validate = require("../middlewares/validate")

router.get(
    "/pages",
    [
        isAuthenticated(true),
        hasPermission({ resource: "pages", actions: ["read"] }),
    ],
    validate("query", {
        sort: yup.string().oneOf(["title", "status"]),
        offset: validators.queryOffsetValidator,
        limit: validators.queryLimitValidator,
        status: validators.pageStatusValidator,
    }),
    pageCtrl.getPages
)
router.get(
    "/pages/:slug",
    validate("params", {
        slug: validators.slugValidator,
    }),
    [
        isAuthenticated(true),
        hasPermission({ resource: "pages", actions: ["read"] }),
    ],
    pageCtrl.getPageBySlug
)
router.get(
    "/pages/:slug/creator",
    validate("params", {
        slug: validators.slugValidator,
    }),
    [
        isAuthenticated(true),
        hasPermission({ resource: "pages", actions: ["read"] }),
    ],
    pageCtrl.getPageCreator
)

router.post(
    "/pages",
    [
        isAuthenticated(false),
        hasPermission({ resource: "pages", actions: ["create"] }),
    ],
    pageCtrl.createPage
)

router.patch(
    "/pages/:slug",
    validate("params", {
        slug: validators.slugValidator,
    }),
    [
        isAuthenticated(false),
        hasPermission({ resource: "pages", actions: ["update"] }),
    ],
    pageCtrl.updatePage
)

router.delete(
    "/pages/:pageId",
    validate("params", {
        slug: validators.slugValidator,
    }),
    [
        isAuthenticated(false),
        hasPermission({ resource: "pages", actions: ["delete"] }),
    ],
    pageCtrl.deletePage
)

module.exports = router
