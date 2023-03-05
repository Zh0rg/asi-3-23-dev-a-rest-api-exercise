const yup = require("yup")
const { InvalidArgumentError } = require("../../errors")

const forwardAsyncErrors = require("../helpers/forward-async-errors")

const validate = (key, shape) => {
    const validator = yup.object().shape(shape)

    return forwardAsyncErrors(async (req, res, next) => {
        try {
            req[key] = await validator.validate(req[key])

            next()
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new InvalidArgumentError(err.errors)
            }
        }
    })
}

module.exports = validate
