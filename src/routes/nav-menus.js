const router = require("express").Router()
const navMenuCtrl = require("../controllers/nav-menus")

const validate = require("../middlewares/validate")
const validators = require("../helpers/validators")

const { isAuthenticated, hasPermission } = require("../middlewares/auth")

router.get(
    "/nav-menus",
    validate("query", {
        name: validators.nameValidator,
        offset: validators.queryOffsetValidator,
        limit: validators.queryLimitValidator,
    }),
    navMenuCtrl.getMenus
)
router.get(
    "/nav-menus/:navMenuName",
    validate("params", {
        navMenuName: validators.nameValidator,
    }),
    navMenuCtrl.getMenuByName
)

router.post(
    "/nav-menus",
    [
        isAuthenticated(false),
        hasPermission({ resource: "menus", actions: ["create"] }),
    ],
    navMenuCtrl.createMenu
)

router.patch(
    "/nav-menus/:navMenuName",
    [
        isAuthenticated(false),
        hasPermission({ resource: "menus", actions: ["update"] }),
    ],
    validate("params", {
        navMenuName: validators.nameValidator,
    }),
    navMenuCtrl.updateMenu
)

router.delete(
    "/nav-menus/:navMenuName",
    [
        isAuthenticated(false),
        hasPermission({ resource: "menus", actions: ["delete"] }),
    ],
    validate("params", {
        navMenuName: validators.nameValidator,
    }),
    navMenuCtrl.deleteMenu
)

module.exports = router
