function adminController(app,db) {

    app.get('/admin/user/', app.loggedIn, app.isAdmin, (req,res) => {
        db.user.findAll()
        .then( (users) => {
            res.status(200).send(users)
        }).catch((err) => {
            res.status(404).send('Any user found: ' + err)
        }
    })

    app.get('/admin/user/:UserID', app.loggedIn, app.isAdmin, (req,res) => {
        db.user.findById(req.params.UserID)
        .then( (user) => {
            res.status(200).send(users)
        }).catch((err) => {
            res.status(404).send('User not found: ' + req.params.UserID + " || " + err)
        }
    })

}

module.exports adminController
