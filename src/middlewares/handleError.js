const { AppError } = require("../../errors")

// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
    if (!(err instanceof AppError)) {
        res.send({ error: ["Oops. Something went wrong."], errorCode: "error" })

        return
    }

    res.status(err.httpCode).send({
        error: err.errors,
        errorCode: err.errorCode,
    })
}

module.exports = handleError
