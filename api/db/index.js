const Sequelize = require('sequelize')
const config = require('./config.json')
const User = require('./models/user')
const Parent = require('./models/parent')
const Owner = require('./models/owner')
const Books = require('./models/books')
const Listing = require('./models/listing')
const Activity = require('./models/activity')
const Tag = require('./models/tag')

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.options
)

const user = User(sequelize)
const parent = Parent(sequelize)
const owner = Owner(sequelize)
const books = Books(sequelize)
const listing = Listing(sequelize)
const activity = Activity(sequelize)
const tag = Tag(sequelize)

module.exports = {
    sequelize,
    user,
    parent,
    owner,
    books,
    listing,
    activity,
    tag
}
