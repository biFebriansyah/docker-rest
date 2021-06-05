const respone = require("../Helpers/respon")
const { redisdb } = require("../Configs/redis")

const getAll = (req, res, next) => {
    redisdb.get("products", (err, data) => {
        if (err) {
            return respone(res, 500, err)
        }

        if (data !== null) {
            const result = JSON.parse(data)
            console.log("Dari redis")
            return respone(res, 200, result)
        } else {
            next()
        }
    })
}

module.exports = getAll
