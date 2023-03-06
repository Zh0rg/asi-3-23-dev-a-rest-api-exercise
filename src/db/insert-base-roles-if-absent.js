const Role = require("./models/role")

const baseRoles = [
    {
        name: "admin",
        permissions: {
            users: {
                create: true,
                read: true,
                readSelf: true,
                update: true,
                updateSelf: true,
                delete: true,
            },
            pages: {
                create: true,
                read: true,
                update: true,
                delete: true,
                readDraft: true,
            },
            menus: {
                create: true,
                read: true,
                update: true,
                delete: true,
            },
            roles: {
                create: true,
                read: true,
                update: true,
                delete: true,
            },
        },
    },
    {
        name: "manager",
        permissions: {
            users: {
                create: false,
                read: false,
                readSelf: true,
                update: false,
                updateSelf: true,
                delete: false,
            },
            pages: {
                create: true,
                read: true,
                update: true,
                delete: true,
                readDraft: true,
            },
            menus: {
                create: true,
                read: true,
                update: true,
                delete: true,
            },
            roles: {
                create: false,
                read: false,
                update: false,
                delete: false,
            },
        },
    },
    {
        name: "editor",
        permissions: {
            users: {
                create: false,
                read: false,
                readSelf: true,
                update: false,
                updateSelf: true,
                delete: false,
            },
            pages: {
                create: false,
                read: true,
                update: true,
                delete: false,
                readDraft: true,
            },
            menus: {
                create: false,
                read: true,
                update: false,
                delete: false,
            },
            roles: {
                create: false,
                read: false,
                update: false,
                delete: false,
            },
        },
    },
    {
        name: "default",
        permissions: {
            users: {
                create: false,
                read: false,
                readSelf: false,
                update: false,
                updateSelf: false,
                delete: false,
            },
            pages: {
                create: false,
                read: true,
                readDraft: false,
                update: true,
                delete: false,
            },
            menus: {
                create: false,
                read: true,
                update: false,
                delete: false,
            },
            roles: {
                create: false,
                read: false,
                update: false,
                delete: false,
            },
        },
    },
]

const insertBaseRoles = async () => {
    if ((await Role.count()) === 0) {
        Role.insertMany(baseRoles)
    }
}

module.exports = insertBaseRoles
