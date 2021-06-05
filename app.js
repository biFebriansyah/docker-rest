const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname + "/.env") })
const express = require("express") //import module / atau file js
const server = express()
const routes = require("./src/main")
const db = require("./src/Configs/db")
const bodyPars = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")

server.use(cors())
server.use(bodyPars.urlencoded({ extended: false }))
server.use(bodyPars.json())
server.use(morgan("dev"))
server.use("/public", express.static("public"))
server.use(routes)

db.sequelizeTest()

server.listen(9000, () => {
    console.log("Service running on port 9000")
})
