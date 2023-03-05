const mongoose = require("mongoose")
const roleSchema = require("../schemas/role")

const Role = mongoose.model("Role", roleSchema, "roles")

module.exports = Role
