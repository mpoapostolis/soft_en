// Setup express server and essential middleware.
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// Require the database module.
const db = require('./db')

// Require and apply API controllers.
const controllers = require('./controllers')
controllers(app,db)

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
