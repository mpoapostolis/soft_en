const Sequelize = require('sequelize')

function Listing(db) {
    return db.define('listing', {
        ListingID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ActivityID: {
            type: Sequelize.UUID,
            allowNull: false
        },
        EventDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        Remaining: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        }
    })
}

module.exports = Listing
