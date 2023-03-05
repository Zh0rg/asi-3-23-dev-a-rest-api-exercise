require("dotenv").config()

const express = require("express")
const cors = require("cors")

require("./src/db/connect").then()

const auth = require("./src/routes/auth")
const users = require("./src/routes/users")
const pages = require("./src/routes/pages")

const handleError = require("./src/middlewares/handleError")

const app = express()

app.use(cors())
app.use(express.json())

app.use(auth)
app.use(users)
app.use(pages)

app.use(handleError)

// eslint-disable-next-line no-console
app.listen(3000, () => console.log("Listening on :3000"))
