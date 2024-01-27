const { Sequelize } = require("sequelize")

async function connectDb(config) {
    const sequelize = new Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`, { logging: false })
    // const sequelize = new Sequelize('postgres://postgres:mysecretpassword@127.0.0.1:15432/cinema')
    try {
        await sequelize.authenticate()
    } catch (error) {
        console.log(error)
        throw new Error()
    }
    return sequelize
}

module.exports = { connectDb }