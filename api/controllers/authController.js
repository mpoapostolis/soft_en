// Password encryption module.
const bcrypt = require('bcrypt')
const saltRounds = 10

// JWT token module and signature key.
const jwt = require('jsonwebtoken')
const fs = require('fs')
const secret = fs.readFileSync('./keys/jwtRS256.key')

function authController(app,db) {
    app.post('/register', (req,res) => {
        bcrypt.hash(req.body.Password,saltRounds).then( (hash) => {
            db.user.create({
                Email: req.body.Email,
                Password: hash,
                Role: req.body.Role,
                Status: 'Active'
            }).then(()=> {
                res.send('Succesfully registered user ' + req.body.Email)
            })
        })
    })

    app.post('/login', (req,res) => {
        db.user.findOne({where: {Email: req.body.Email}})
               .then( (us) => {
                   let sentPass = req.body.Password
                   if(!us) {
                       res.send('User not found')
                   }
                   else bcrypt.compare(req.body.Password, us.Password)
                              .then( (result) => {
                                  if (result) {
                                      jwt.sign(
                                          { UserID: us.UserID, Role: us.Role},
                                          secret,
                                          (err,token) => {
                                              if (err) {
                                                  res.send('oops')
                                              }
                                              else {
                                                  res.send(token)
                                              }
                                          }
                                      )
                                  }
                                  else res.send('Wrong Password')
                              })
               })
               .catch( (err) => {
                   res.send('ERR!')
               })
    })
}

module.exports = authController
