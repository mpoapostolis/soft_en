// Setup express server and essential middleware.
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// Require the database module.
const db = require('./db')
const authController = require('./controllers/authController')

app.get('/works', (req,res) => {
    res.send('Here')
})

// Start the server and synchronize the database model.
app.listen(3000, () => { db.sequelize.sync() } )

// Register authentication routes.
authController(app,db)

app.get('/all', (req,res) => {
    db.user.findAll()
           .then((u) => {
               res.json(u)
           })
})

app.get('/:ent/:id', (req,res) => {
    res.json({"entrypoint": req.params.ent, "id": req.params.id})
    // res.send(`Received API call at entrypoint = ${req.params.ent} and id = ${req.params.id}`)
})
