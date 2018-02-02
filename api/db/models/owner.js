const Sequelize = require('sequelize')

function Owner(db) {
    return db.define('owner', {
        OwnerID: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        CompanyName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        TaxNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Address: {
          type: Sequelize.STRING,
          allowNull: false
        },
        Coordinates: {
          type: Sequelize.STRING,
          allowNull: false
        },
        IBAN: {
          type: Sequelize.STRING,
          allowNull: false
        },
        SWIFT: {
          type: Sequelize.STRING,
          allowNull: false
        },
        BIC: {
          type: Sequelize.STRING,
          allowNull: false
        },
        Balance: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
              min: 0
          }
        }
    })
}

module.exports = Owner
