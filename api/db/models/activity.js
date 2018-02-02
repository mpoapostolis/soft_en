const Sequelize = require('sequelize')

function Activity(db) {
    return db.define('activity', {
        ActivityID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        OwnerID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        AgeGroups: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Pictures: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Coordinates: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
}

module.exports = Activity
