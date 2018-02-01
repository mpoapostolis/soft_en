const Sequelize = require('sequelize')

function User(db) {
    return db.define('user', {
        UserID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        Password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Role: {
            type: Sequelize.ENUM('Parent','Owner','Admin'),
            allowNull: false,
            validate: {
                isIn: [['Parent','Owner','Admin']]
            }
        },
        Status: {
            type: Sequelize.ENUM('Active','Banned','Deleted'),
            allowNull: false
        }
    })
}

module.exports = User
