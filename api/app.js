// Setup express server and essential middleware.
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// Require the database module.
const db = require('./db')

// Reuire controllers
const authController = require('./controllers/authController')
const parentController = require('./controllers/parentController')
const ownerController = require('./controllers/ownerController')

// ... and register them.
authController(app,db)
parentController(app,db)
ownerController(app,db)

// Start the server and synchronize the database model.
app.listen(3000, () => { db.sequelize.sync() } )
