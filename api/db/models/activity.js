const Sequelize = require('sequelize')

function Activity(db) {
    return db.define('activity', {
        ActivityID: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
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
            type: Sequelize.STRING,
            allowNull: true
        },
        Description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        Pictures: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Coordinates: {
            type: Sequelize.GEOGRAPHY('POINT', '4326'),
            allowNull: false
        }
    })
}

module.exports = Activity
