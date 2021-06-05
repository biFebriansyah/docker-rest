const express = require("express") //import module / atau file js
const routes = express.Router()
const ctrl = require('../Controllers/auth')

routes.post("/", ctrl.login)


module.exports = routes
