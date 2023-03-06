const router = require("express").Router()
const roleCtrl = require("../controllers/roles")

const { isAuthenticated, hasPermission } = require("../middlewares/auth")

const yup = require("yup")
const validators = require("../helpers/validators")
const validate = require("../middlewares/validate")

router.get(
    "/roles",
    validate("query", {
        sort: yup.string().oneOf(["name"]),
    }),
    roleCtrl.getRoles
)
router.get(
    "/roles/:name",
    validate("params", {
        name: validators.roleValidator,
        offset: validators.queryOffsetValidator,
        limit: validators.queryLimitValidator,
    }),
    roleCtrl.getRoleByName
)

router.post(
    "/roles",
    [
        isAuthenticated(false),
        hasPermission({ resource: "roles", actions: ["create"] }),
    ],
    roleCtrl.createRole
)

router.patch(
    "/roles/:name",
    validate("params", {
        name: validators.roleValidator,
    }),
    [
        isAuthenticated(false),
        hasPermission({ resource: "roles", actions: ["update"] }),
    ],
    roleCtrl.updateRole
)

router.delete(
    "/roles/:name",
    validate("params", {
        name: validators.roleValidator,
    }),
    [
        isAuthenticated(false),
        hasPermission({ resource: "roles", actions: ["delete"] }),
    ],
    roleCtrl.deleteRole
)

module.exports = router
