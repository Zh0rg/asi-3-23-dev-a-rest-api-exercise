const yup = require("yup")
const config = require("../../config")

const nameValidator = yup
    .string()
    .matches(/^[\p{L} -]+$/u, "Name is invalid")
    .label("Name")

const firstNameValidator = nameValidator.label("First name")

const lastNameValidator = nameValidator.label("Last name")

const emailValidator = yup.string().email().label("E-mail")

const passwordValidator = yup
    .string()
    .matches(
        /^(?=.*[^\p{L}0-9])(?=.*[0-9])(?=.*\p{Lu})(?=.*\p{Ll}).{8,}$/u,
        "Password must be at least 8 chars & contain at least one of each: lower case, upper case, digit, special char."
    )
    .label("Password")

const roleValidator = yup.string().oneOf(["admin", "manager", "editor"])

const pageStatusValidator = yup.string().oneOf(["draft", "published"])

const slugValidator = yup.string().matches(/[a-z][a-z-]*[a-z]/)

const queryLimitValidator = yup
    .number()
    .integer()
    .min(config.pagination.limit.min)
    .default(config.pagination.limit.default)
    .label("Query Limit")

const queryOffsetValidator = yup.number().integer().min(0).label("Query Offset")

module.exports = {
    nameValidator,
    firstNameValidator,
    lastNameValidator,
    emailValidator,
    passwordValidator,
    roleValidator,
    pageStatusValidator,
    slugValidator,
    queryLimitValidator,
    queryOffsetValidator,
}
