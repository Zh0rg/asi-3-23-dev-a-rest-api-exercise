const router = require("express").Router()
const navMenuCtrl = require("../controllers/nav-menus")

const validate = require("../middlewares/validate")
const validators = require("../helpers/validators")

const { isAuthenticated, hasPermission } = require("../middlewares/auth")

router.get("/nav-menus", navMenuCtrl.getnavMenus)
router.get(
    "/nav-menus/:navMenuName",
    validate("params", {
        navMenuName: validators.nameValidator,
    }),
    navMenuCtrl.getnavMenuById
)

router.post(
    "/nav-menus",
    [
        isAuthenticated(false),
        hasPermission({ resource: "menus", actions: ["create"] }),
    ],
    navMenuCtrl.createnavMenu
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
    navMenuCtrl.updatenavMenu
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
    navMenuCtrl.deletenavMenu
)

module.exports = router
