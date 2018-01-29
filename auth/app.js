const express = require('express');
const simpleOauthModule = require('simple-oauth2');

const app = express();
// const oauth2 = simpleOauthModule.create({})

app.listen(3000)

app.get('/', (req,res) => {
    res.send("Auth service working!")
})
