// Setup express server and essential middleware.
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// Require the database module.
const db = require('./db')
const authController = require('./controllers/authController')

// Start the server and synchronize the database model.
app.listen(3000, () => { db.sequelize.sync() } )

// Register authentication routes.
authController(app,db)
