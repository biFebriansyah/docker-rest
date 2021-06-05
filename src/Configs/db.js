const { Sequelize } = require("sequelize")

class dbConnect {
    constructor() {
        this.sequelize = new Sequelize(
            process.env.DB_DATABASE,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                dialect: "postgres",
                dialectOptions: {
                    timezone: process.env.DB_TIMEZONE,
                },
            }
        )
    }

    sequelizeTest() {
        this.sequelize
            .authenticate()
            .then(() => {
                console.log("Connection has been established successfully.")
            })
            .catch((err) => {
                console.error("Unable to connect to the database:", err)
            })
    }
}

module.exports = new dbConnect()
