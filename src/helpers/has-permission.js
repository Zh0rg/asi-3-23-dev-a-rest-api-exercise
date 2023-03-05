const Role = require("../db/models/role")

const hasPermission = async ({ role, resource, action }) => {
    const roleObj = await Role.findOne({ name: role })

    return roleObj.permissions[resource][action]
}

module.exports = hasPermission