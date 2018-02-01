const Sequelize = require('sequelize')
const config = require('./config.json')
const User = require('./models/user')

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.options
)

const user = User(sequelize)

module.exports = {
    sequelize,
    user
}
