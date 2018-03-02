// Require controllers
const authController = require('./authController')
const parentController = require('./parentController')
const ownerController = require('./ownerController')
const publicController = require('./publicController')
const adminController = require('./adminController')

// ... and register them.
function registerControllers(app, db) {
    authController(app, db)
    parentController(app, db)
    ownerController(app, db)
    publicController(app, db)
    adminController(app, db)
}

module.exports = registerControllers
