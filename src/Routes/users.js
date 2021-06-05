const express = require("express") //import module / atau file js
const routes = express.Router()
const ctrl = require("../Controllers/users")
const validate = require("../middleware/validate")

routes.get("/commit", ctrl.commit)
routes.get("/drop", ctrl.drop)
routes.get("/", validate(["admin"]), ctrl.getByData)
routes.get("/q", validate(["admin", "user"]), ctrl.getPaginate)
routes.get("/:email", validate(["admin", "user"]), ctrl.getByEmail)
routes.post("/", ctrl.add)

module.exports = routes
