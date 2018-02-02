// Password encryption module.
const bcrypt = require('bcrypt')
const saltRounds = 10

// JWT token module and signature key.
const jwt = require('jsonwebtoken')
const fs = require('fs')
const secret = fs.readFileSync('./keys/jwtRS256.key')

function authController(app,db) {
    // User registration route.
    app.post('/register', (req,res) => {
        bcrypt.hash(req.body.Password,saltRounds).then( (hash) => {
            db.user.create({
                // TODO Set Email to unique.
                Email: req.body.Email,
                Password: hash,
                // TODO Refuse Admin registration from web client.
                Role: req.body.Role,
                Status: 'Active'
            }).then(()=> {
                res.send('Succesfully registered user ' + req.body.Email)
            })
        })
    })

    // User login route. Return a jwt token upon successful login.
    app.post('/login', (req,res) => {
        db.user.findOne({where: {Email: req.body.Email}})
               .then( (us) => {
                   let sentPass = req.body.Password
                   if(!us) {
                       // TODO Send appropriate response code to client.
                       res.send('User not found')
                   }
                   // If we have a user, verify that the passwords match.
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
