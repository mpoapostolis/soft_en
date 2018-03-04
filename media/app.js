const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const imageController = require('./controllers/imageController')

const port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

imageController(app)

app.listen(port)

app.get('/', (req,res) => {
    res.send("Media service working!")
})
