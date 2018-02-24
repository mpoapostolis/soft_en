const Sequelize = require('sequelize')
const tags = require('../../config/tagValues.json')

function Tag(db) {
    return db.define('tag', {
        ActivityID: {
            type: Sequelize.UUID
        },
        Tag: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [tags]
            }
        }
    })
}

module.exports = Tag
