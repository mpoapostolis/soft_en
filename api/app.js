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
const publicController = require('./controllers/publicController')
const adminController = require('./controllers/adminController')


// ... and register them.
authController(app,db)
parentController(app,db)
ownerController(app,db)
publicController(app,db)
adminController(app,db)

let connected = true

// Start the server and synchronize the database model.
const server = app.listen(3000, () => {
    db.sequelize.sync( { logging: false } )
    .then( () => {
        console.log('Database synchronized, everything OK')
    })
    .catch( (err) => {
        connected = false
        // TODO Find a more elegant way to deal with db connection errors.
        console.error(err)
    })
})

app.get('/', (req,res) => {
    res.send(`Database is ${ ( connected ? '' : 'NOT ' ) }connected`)
})
