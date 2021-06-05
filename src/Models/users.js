const db = require("../Configs/db").sequelize
const Sequelize = require("sequelize")

class Users {
    constructor() {
        this.Users = db.define("Users", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            role_user: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            username_user: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            password_user: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        })
    }

    commit() {
        return new Promise((reslove, reject) => {
            if (process.env.MODE == "Dev") {
                this.Users.sync()
                    .then(() => {
                        reslove("Users Data Commit succsess")
                    })
                    .catch((err) => {
                        console.log(err)
                        reject("Something hapen while commiting \n", err)
                    })
            }
            if (process.env.MODE == "Prod") {
                reject("Youre on mode Production")
            }
        })
    }

    add(data) {
        return new Promise((reslove, reject) => {
            this.Users.create({
                role_user: data.role,
                username_user: data.username,
                password_user: data.password,
            })
                .then((res) => {
                    reslove(res.toJSON())
                })
                .catch((err) => {
                    if (err.name.toString() == "SequelizeDatabaseError") {
                        reject("SIlahkan komit database terlebih dahulu")
                    } else {
                        reject(err)
                    }
                })
        })
    }

    update(data, id) {
        return new Promise((reslove, reject) => {
            this.Users.findByPk(id)
                .then((record) => {
                    if (!record) {
                        reject("Data not found")
                    }

                    record.update(data).then((result) => {
                        reslove(result.toJSON())
                    })
                })
                .catch((err) => {
                    if (err.name.toString() == "SequelizeDatabaseError") {
                        reject("SIlahkan komit database terlebih dahulu")
                    } else {
                        reject(err)
                    }
                })
        })
    }

    destroy(id) {
        return new Promise((reslove, reject) => {
            this.Users.findByPk(id)
                .then((record) => {
                    if (!record) {
                        reject("Data not found")
                    }

                    record.destroy().then((result) => {
                        reslove(result)
                    })
                })
                .catch((err) => {
                    if (err.name.toString() == "SequelizeDatabaseError") {
                        reject("SIlahkan komit database terlebih dahulu")
                    } else {
                        reject(err)
                    }
                })
        })
    }

    findId(id) {
        return new Promise((reslove, reject) => {
            this.Users.findByPk(id)
                .then((res) => {
                    if (!res) {
                        reslove("Data not Found")
                    } else {
                        reslove(res.toJSON())
                    }
                })
                .catch((err) => {
                    if (err.name.toString() == "SequelizeDatabaseError") {
                        reject("SIlahkan komit database terlebih dahulu")
                    } else {
                        reject(err)
                    }
                })
        })
    }

    getColumnData(column, expresi) {
        return new Promise((reslove, reject) => {
            this.Users.findAll({
                raw: true,
                attributes: column,
                where: expresi,
            })
                .then((res) => {
                    if (res.length <= 0) {
                        reslove("Data not Found")
                    } else {
                        reslove(res)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    if (err.name.toString() == "SequelizeDatabaseError") {
                        reject("SIlahkan komit database terlebih dahulu")
                    } else {
                        reject(err)
                    }
                })
        })
    }

    findByEmail(email) {
        return new Promise((reslove, reject) => {
            this.Users.findAll({
                order: [["createdAt", "DESC"]],
                where: {
                    email_user: email,
                },
            })
                .then((res) => {
                    if (res.length <= 0) {
                        reslove("Data not Found")
                    } else {
                        reslove(res)
                    }
                })
                .catch((err) => {
                    if (err.name.toString() == "SequelizeDatabaseError") {
                        reject("SIlahkan komit database terlebih dahulu")
                    } else {
                        reject(err)
                    }
                })
        })
    }

    findByUser(username) {
        return new Promise((reslove, reject) => {
            this.Users.findAll({
                order: [["createdAt", "DESC"]],
                where: {
                    username_user: username,
                },
            })
                .then((res) => {
                    if (res.length <= 0) {
                        reslove("Data not Found")
                    } else {
                        reslove(res)
                    }
                })
                .catch((err) => {
                    if (err.name.toString() == "SequelizeDatabaseError") {
                        reject("SIlahkan komit database terlebih dahulu")
                    } else {
                        reject(err)
                    }
                })
        })
    }

    findByWhat(data) {
        return new Promise((reslove, reject) => {
            this.Users.findAll({
                order: [["createdAt", "DESC"]],
                where: data,
            })
                .then((res) => {
                    if (res.length <= 0) {
                        reslove("Data not Found")
                    } else {
                        reslove(res)
                    }
                })
                .catch((err) => {
                    if (err.name.toString() == "SequelizeDatabaseError") {
                        reject("SIlahkan komit database terlebih dahulu")
                    } else {
                        reject(err)
                    }
                })
        })
    }

    findAll() {
        return new Promise((reslove, reject) => {
            this.Users.findAll({
                order: [["createdAt", "DESC"]],
            })
                .then((res) => {
                    if (res.length <= 0) {
                        reslove("Data not Found")
                    } else {
                        reslove(res)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    if (err.name.toString() == "SequelizeDatabaseError") {
                        reject("SIlahkan komit database terlebih dahulu")
                    } else {
                        reject(err)
                    }
                })
        })
    }

    paginate(page, limit) {
        return new Promise((reslove, reject) => {
            this.Users.findAll({
                order: [["createdAt", "DESC"]],
                limit: limit,
                offset: page,
            })
                .then((res) => {
                    if (res.length <= 0) {
                        reslove("Data not Found")
                    } else {
                        reslove(res)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    if (err.name.toString() == "SequelizeDatabaseError") {
                        reject("SIlahkan komit database terlebih dahulu")
                    } else {
                        reject(err)
                    }
                })
        })
    }

    down() {
        return new Promise((reslove, reject) => {
            if (process.env.MODE == "Dev") {
                this.Users.drop()
                    .then(() => {
                        reslove("User data Droped succsess")
                    })
                    .catch((err) => {
                        console.log(err)
                        reject("Something hapen while commiting \n", err)
                    })
            }
            if (process.env.MODE == "Prod") {
                reject("Youre on mode Production")
            }
        })
    }
}

module.exports = new Users()
