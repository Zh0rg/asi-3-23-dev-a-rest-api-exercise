const mongoose = require("mongoose")
const { Schema } = mongoose

const basicPermissions = {
    create: Boolean,
    read: Boolean,
    update: Boolean,
    delete: Boolean,
}

const permissionsSchema = new Schema(basicPermissions)
const userPermissionsSchema = new Schema({
    ...basicPermissions,
    readSelf: Boolean,
    updateSelf: Boolean,
})
const pagePermissionsSchema = new Schema({
    ...basicPermissions,
    readDraft: Boolean,
})

const roleSchema = new Schema(
    {
        name: {
            type: String,
            enum: ["admin", "manager", "editor"],
        },
        permissions: {
            users: userPermissionsSchema,
            pages: pagePermissionsSchema,
            menus: permissionsSchema,
            roles: permissionsSchema,
        },
    },
    { versionKey: false }
)

module.exports = roleSchema
