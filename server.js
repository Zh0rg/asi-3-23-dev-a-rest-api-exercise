require("dotenv").config()

const express = require("express")
const cors = require("cors")

const auth = require("./src/routes/auth")
const users = require("./src/routes/users")
const pages = require("./src/routes/pages")
const menus = require("./src/routes/nav-menus")
const roles = require("./src/routes/roles")

const handleError = require("./src/middlewares/handleError")

require("./src/db/connect")
    .then(() => {
        return require("./src/db/insert-base-roles-if-absent")()
    })
    .then(() => {
        const app = express()

        app.use(cors())
        app.use(express.json())

        app.use(auth)
        app.use(users)
        app.use(pages)
        app.use(menus)
        app.use(roles)

        app.use(handleError)

        // eslint-disable-next-line no-console
        app.listen(3000, () => console.log("Listening on :3000"))
    })
