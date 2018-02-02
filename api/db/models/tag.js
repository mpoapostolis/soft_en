const Sequelize = require('sequelize')

function Tag(db) {
    return db.define('tag', {
        ActivityID: {
            type: Sequelize.INTEGER
        },
        Tag: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}

module.exports = Tag
