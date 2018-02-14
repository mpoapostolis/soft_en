// Password encryption module.
const bcrypt = require('bcrypt')
const saltRounds = 10

// JWT token module and signature key.
const jwt = require('jsonwebtoken')
const fs = require('fs')
const secret = fs.readFileSync('./keys/jwtRS256.key')

function authController(app,db) {

    // A helper function that checks the validity of a submitted token.
    // If the token is valid, UserID and Role are set in the request body.
    app.loggedIn = function(req,res,next) {
        let token = req.headers.authorization.replace('Bearer ','')
        jwt.verify(token, secret, (err,decoded) => {
            if (err) {
                res.send('Invalid token')
            }
            else {
                req.headers.Role = decoded.Role
                req.headers.UserID = decoded.UserID
                next()
            }
        })
    }

    function registerParent(req,res,user) {
        db.parent.create({
            ParentID: user.get('UserID'),
            Name: req.body.Name,
            Address: req.body.Address,
            Phone: req.body.Phone,
            Balance: 0,
            BonusPoints: 0
        }).then( (parent) => {
            res.send('Welcome to our service, ' + parent.get('Name'))
        })
    }

    // TODO Update according to schema.
    function registerOwner(req,res,user) {
        db.owner.create({
            OwnerID: user.get('UserID'),
            CompanyName: req.body.CompanyName,
            TaxNumber: req.body.TaxNumber,
            Address: req.body.Address,
            Coordinates: req.body.Coordinates,
            IBAN: req.body.IBAN,
            SWIFT: req.body.SWIFT,
            BIC: req.body.BIC,
            Balance: 0
        }).then( (owner) => {
            res.send('Welcome to our service, ' + owner.get('CompanyName'))
        })
    }

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
            }).then( (user) => {
                if (req.body.Role === 'Parent') {
                    registerParent(req,res,user)
                } else {
                    registerOwner(req,res,user)
                }
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
