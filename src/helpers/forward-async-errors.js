const forwardAsyncErrors = (mw) => async (req, res, next) => {
    try {
        await mw(req, res, next)
    } catch (err) {
        next(err)
    }
}

module.exports = forwardAsyncErrors
