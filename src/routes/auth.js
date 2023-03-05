const router = require("express").Router()

const authCtrl = require("../controllers/auth")

const validate = require("../middlewares/validate")
const validators = require("../helpers/validators")

router.post(
    "/auth/login",
    validate("body", {
        email: validators.emailValidator.required(),
        password: validators.passwordValidator.required(),
    }),
    authCtrl.login
)

module.exports = router
