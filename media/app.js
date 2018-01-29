const express = require('express');
const watermark = require('image-watermark');

const app = express();

app.listen(3000)

app.get('/', (req,res) => {
    res.send("Media service working!")
})
