const Sequelize = require('sequelize')

function Books(db) {
    return db.define('books', {
        BookingID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ParentID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ListingID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        }
    })
}

module.exports = Books
