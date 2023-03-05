const mongoose = require("mongoose")
const navMenuSchema = require("../schemas/nav-menu")

const NavMenu = mongoose.model("navMenu", navMenuSchema)

module.exports = NavMenu
