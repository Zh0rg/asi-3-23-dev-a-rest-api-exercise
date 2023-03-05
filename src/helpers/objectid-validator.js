const { InvalidArgumentError } = require("../../errors")
const mongoose = require("mongoose")

const objectIdValidator = (idParam) => (req, res, next) => {
    if (!(idParam in req.params)) {
        throw new InvalidArgumentError(["ID required"])
    }

    if (!mongoose.Types.ObjectId.isValid(req.params[idParam])) {
        throw new InvalidArgumentError(["Invalid ID"])
    }

    next()
}

module.exports = objectIdValidator
