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
                console.error(err)
                res.status(401).send('Invalid token')
            }
            else {
                req.headers.Role = decoded.Role
                req.headers.UserID = decoded.UserID
                next()
            }
        })
    }

    app.isParent = function(req,res,next) {
        if(req.headers.Role === 'Parent') {
            next()
        }
        else {
            res.status(401).send('Not a parent')
        }
    }

    app.isOwner = function(req,res,next) {
        if(req.headers.Role === 'Owner') {
            next()
        }
        else {
            res.status(401).send('Not an owner')
        }
    }

    app.isAdmin = function(req,res,next) {
        if(req.headers.Role === 'Admin') {
            next()
        }
        else {
            res.status(401).send('Not an admin')
        }
    }

    function registerParent(req,res,user) {
        db.parent.create({
            ParentID: user.get('UserID'),
            Name: req.body.Name,
            Address: req.body.Address,
            Phone: req.body.Phone,
            Balance: 0,
            BonusPoints: 0
        })
        .then( (parent) => {
            res.status(201).send('Welcome to our service, ' + parent.get('Name'))
        })
        .catch( (err) => {
            console.error(err)
            res.status(400).send('Parent not saved')
        })
    }

    function registerOwner(req,res,user) {
        db.owner.create({
            OwnerID: user.get('UserID'),
            CompanyName: req.body.CompanyName,
            TaxNumber: req.body.TaxNumber,
            Address: req.body.Address,
            IBAN: req.body.IBAN,
            SWIFT: req.body.SWIFT,
            BIC: req.body.BIC,
            Balance: 0
        })
        .then( (owner) => {
            res.status(201).send('Welcome to our service, ' + owner.get('CompanyName'))
        })
        .catch( (err) => {
            console.error(err)
            res.status(400).send('Owner not saved')
        })
    }

    // User registration route.
    app.post('/register', (req,res) => {
        if (['Parent','Owner'].includes(req.body.Role)) {
            bcrypt.hash(req.body.Password,saltRounds).then( (hash) => {
                db.user.create({
                    Email: req.body.Email,
                    Password: hash,
                    Role: req.body.Role,
                    Status: 'Active'
                })
                .then( (user) => {
                    if (req.body.Role === 'Parent') {
                        registerParent(req,res,user)
                    } else {
                        registerOwner(req,res,user)
                    }
                })
                .catch( (err) => {
                    console.error(err)
                    res.status(400).send('User not created')
                })
            })
        } else {
            res.status(400).send('Unsupported user role.')
        }
    })

    // TODO Check user status.
    // User login route. Return a jwt token upon successful login.
    app.post('/login', (req,res) => {
        db.user.findOne({where: {Email: req.body.Email}})
               .then( (us) => {
                   let sentPass = req.body.Password
                   if(!us) {
                       res.status(401).send('User not found')
                   }
                   // If we have a user, verify that the passwords match.
                   else {
                       bcrypt.compare(req.body.Password, us.Password)
                      .then( (result) => {
                          if (result) {
                              jwt.sign(
                                  { UserID: us.UserID, Role: us.Role},
                                  secret,
                                  (err,token) => {
                                      if (err) {
                                          res.status(500).send('Error creating token.')
                                      }
                                      else {
                                          res.status(200).send(token)
                                      }
                                  }
                              )
                          }
                          else {
                              res.status(401).send('Wrong Password')
                          }
                      })
                  }
               })
               .catch( (err) => {
                   res.status(401).send('Not found')
               })
    })
}

module.exports = authController
