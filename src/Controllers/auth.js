const bcr = require("bcrypt")
const model = require("../Models/users")
const respon = require("../Helpers/respon")
const jwt = require("jsonwebtoken")

class Auth {
    login = async (req, res) => {
        try {
            const [{ password_user, role_user }] = await model.getColumnData(
                ["password_user", "role_user"],
                {
                    username_user: req.body.username,
                }
            )
            const passUser = req.body.password
            console.log(passUser)

            if (!password_user) {
                return respon(res, 400, "Username tidak terdaftar")
            }

            const cek = await bcr.compare(passUser, password_user) // sama atau gk passwrodnya

            if (cek) {
                const result = await this.setToken(req.body.username, role_user)
                // result.users = passDB[0]
                return respon(res, 200, result)
            } else {
                return respon(res, 401, "Password Salah")
            }
        } catch (error) {
            console.log(error)
            return respon(res, 500, error)
        }
    }

    setToken = async (email, role) => {
        try {
            const payload = {
                users: email,
                role: role,
            }

            const token = jwt.sign(payload, process.env.JWT_KEYS)

            const result = {
                msg: "Token created",
                token: token,
            }
            return result
        } catch (error) {
            throw error
        }
    }
}

module.exports = new Auth()
