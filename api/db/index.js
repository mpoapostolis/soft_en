const Sequelize = require('sequelize')
const config = require('./config.json')
const User = require('./models/user')
const Parent = require('./models/parent')
const Owner = require('./models/owner')
const Books = require('./models/books')
const Listing = require('./models/listing')
const Activity = require('./models/activity')
const Tag = require('./models/tag')
const Review = require('./models/review')

// Initialize DB handler.
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.options
)

// Define DB Entity models.
const user = User(sequelize)
const parent = Parent(sequelize)
const owner = Owner(sequelize)
const books = Books(sequelize)
const listing = Listing(sequelize)
const activity = Activity(sequelize)
const tag = Tag(sequelize)
const review = Review(sequelize)

// Define associations.
owner.belongsTo(user, {foreignKey: 'OwnerID'})
parent.belongsTo(user, {foreignKey: 'ParentID'})
review.belongsTo(books, {foreignKey: 'BookingID'})

owner.hasMany(activity, {foreignKey: 'OwnerID'})
activity.hasMany(listing, {foreignKey: 'ActivityID'})

listing.hasMany(books, {foreignKey: 'ListingID'})
parent.hasMany(books, {foreignKey: 'ParentID'})

activity.hasMany(tag, {foreignKey: 'ActivityID'})

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
