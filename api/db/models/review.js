const Sequelize = require('sequelize')

function Review(db) {
    return db.define('review', {
        BookingID: {
            type: Sequelize.INTEGER
        },
        Score: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Complains: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })
}

module.exports = Review
