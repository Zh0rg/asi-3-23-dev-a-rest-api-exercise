const mongoose = require("mongoose")
const pageSchema = require("../schemas/page")

const Page = mongoose.model("page", pageSchema)

module.exports = Page
