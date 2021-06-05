const model = require("../Models/users")
const respon = require("../Helpers/respon")
const hashPassword = require("../Helpers/hash")

class Users {
    async add(req, res) {
        try {
            const check = await model.findByUser(req.body.username)

            if (check != "Data not Found") {
                return respon(res, 400, "username sudah terdaftar")
            }

            const newPassword = await hashPassword(req.body.password)
            const users = {
                role: req.body.role,
                username: req.body.username,
                password: newPassword,
            }

            const data = await model.add(users)
            return respon(res, 200, data)
        } catch (error) {
            console.log(error)
            return respon(res, 500, error, true)
        }
    }

    async getByData(req, res) {
        try {
            const data = {}
            let result = ""
            const { role, name, email, username } = req.query

            if (role) {
                data.role_user = role
            }
            if (name) {
                data.name_user = name
            }
            if (email) {
                data.email_user = email
            }
            if (username) {
                data.username_user = username
            }

            if (Object.keys(data).length === 0) {
                result = await model.findAll()
            } else {
                result = await model.findByWhat(data)
            }
            return respon(res, 200, result)
        } catch (error) {
            return respon(res, 500, error, true)
        }
    }

    async getAll(req, res) {
        try {
            const result = await model.findAll()
            return respon(res, 200, result)
        } catch (error) {
            return respon(res, 500, error, true)
        }
    }

    async getPaginate(req, res) {
        try {
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)

            const startIndex = (page - 1) * limit
            const totalDoc = await model.Users.count()
            const totalPage = Math.ceil(totalDoc / limit)
            const result = await model.paginate(startIndex, limit)
            const payload = {}

            payload.pageInfo = {
                totalPages: totalPage,
                limit: limit,
                currentPage: page,
            }
            if (page < totalPage) {
                payload.pageInfo.nextPage = page + 1
            }

            if (startIndex > 0) {
                payload.pageInfo.previousPage = page - 1
            }

            result.unshift(payload)
            return respon(res, 200, result)
        } catch (error) {
            return respon(res, 500, error, true)
        }
    }

    async getByEmail(req, res) {
        try {
            console.log(req.params.email)
            const result = await model.findByEmail(req.params.email)
            return respon(res, 200, result)
        } catch (error) {
            console.log(error)
            return respon(res, 500, error, true)
        }
    }

    async commit(req, res) {
        try {
            const result = await model.commit()
            return respon(res, 200, result)
        } catch (error) {
            return respon(res, 500, error, true)
        }
    }

    async drop(req, res) {
        try {
            const result = await model.down()
            return respon(res, 200, result)
        } catch (error) {
            return respon(res, 500, error, true)
        }
    }
}

module.exports = new Users()
