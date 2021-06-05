const express = require("express") //import module / atau file js
const routes = express.Router()
const users = require("./Routes/users")
const auth = require("./Routes/auth")
const { cloudinaryConfig } = require("./Configs/cloudINary")

// routes.use("*", cloudinaryConfig)
routes.use("/users", users)
routes.use("/auth", auth)
routes.get("/test", (req, res) => {
    res.send("Hello!!")
})

module.exports = routes
