const mongoose = require("mongoose")
const { Schema } = mongoose

const basicPermissions = {
    create: {
        type: Boolean,
        required: true,
    },
    read: {
        type: Boolean,
        required: true,
    },
    update: {
        type: Boolean,
        required: true,
    },
    delete: {
        type: Boolean,
        required: true,
    },
}

const permissionsSchema = new Schema(basicPermissions, { _id: false })
const userPermissionsSchema = new Schema(
    {
        ...basicPermissions,
        readSelf: {
            type: Boolean,
            required: true,
        },
        updateSelf: {
            type: Boolean,
            required: true,
        },
    },
    { _id: false }
)
const pagePermissionsSchema = new Schema(
    {
        ...basicPermissions,
        readDraft: {
            type: Boolean,
            required: true,
        },
    },
    { _id: false }
)

const roleSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
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
