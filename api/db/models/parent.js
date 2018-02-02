const Sequelize = require('sequelize')

function Parent(db) {
    return db.define('parent', {
        ParentID: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Phone: {
          type: Sequelize.STRING,
          allowNull: false
        },
        Balance: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        BonusPoints: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
    })
}

module.exports = Parent
