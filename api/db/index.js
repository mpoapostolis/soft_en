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
owner.belongsTo(user, {foreignKey: 'OwnerID', targetKey: 'UserID'})
parent.belongsTo(user, {foreignKey: 'ParentID', targetKey: 'UserID'})
review.belongsTo(books, {foreignKey: 'BookingID', targetKey: 'BookingID'})

owner.hasMany(activity, {foreignKey: 'OwnerID', targetKey: 'OwnerID'})
activity.belongsTo(owner, {foreignKey: 'OwnerID', targetKey: 'OwnerID'})

activity.hasMany(listing, {foreignKey: 'ActivityID', targetKey: 'ActivityID'})
listing.belongsTo(activity, {foreignKey: 'ActivityID', targetKey: 'ActivityID'})

listing.hasMany(books, {foreignKey: 'ListingID', targetKey: 'ListingID'})
books.belongsTo(listing, {foreignKey: 'ListingID', targetKey: 'ListingID'})

parent.hasMany(books, {foreignKey: 'ParentID', targetKey: 'ParentID'})
books.belongsTo(parent, {foreignKey: 'ParentID', targetKey: 'ParentID'})

activity.hasMany(tag, {foreignKey: 'ActivityID', targetKey: 'ActivityID'})

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
