const router = require("express").Router()
const userCtrl = require("../controllers/users")

const { isAuthenticated, hasPermission } = require("../middlewares/auth")

const yup = require("yup")
const validators = require("../helpers/validators")
const validate = require("../middlewares/validate")
const objectIdValidator = require("../helpers/objectid-validator")

router.get(
    "/users",
    [
        isAuthenticated(false),
        hasPermission({ resource: "users", actions: ["read"] }),
    ],
    validate("query", {
        sort: yup.string().oneOf(["firstName", "lastName", "role"]),
        offset: validators.queryOffsetValidator,
        limit: validators.queryLimitValidator,
        email: validators.emailValidator,
        firstName: validators.firstNameValidator,
        lastName: validators.lastNameValidator,
        role: validators.roleValidator,
    }),
    userCtrl.getUsers
)
router.get(
    "/users/:userId",
    objectIdValidator("userId"),
    [
        isAuthenticated(false),
        hasPermission({ resource: "users", actions: ["read", "readSelf"] }),
    ],
    userCtrl.getUserById
)

router.post(
    "/users",
    [
        isAuthenticated(false),
        hasPermission({ resource: "users", actions: ["create"] }),
    ],
    userCtrl.createUser
)

router.patch(
    "/users/:userId",
    objectIdValidator("userId"),
    [
        isAuthenticated(false),
        hasPermission({ resource: "users", actions: ["update", "updateSelf"] }),
    ],
    userCtrl.updateUser
)

router.delete(
    "/users/:userId",
    objectIdValidator("userId"),
    [
        isAuthenticated(false),
        hasPermission({ resource: "users", actions: ["delete"] }),
    ],
    userCtrl.deleteUser
)

module.exports = router
