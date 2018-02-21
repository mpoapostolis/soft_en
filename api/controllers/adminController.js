function adminController(app,db) {

    app.get('/admin/user/', app.loggedIn, app.isAdmin, (req,res) => {
        db.user.findAll()
        .then( (users) => {
            res.send(users)
        })
    })

    app.get('/admin/user/:UserID', app.loggedIn, app.isAdmin, (req,res) => {
        db.user.findById(req.params.UserID)
        .then( (user) => {
            res.send(users)
        })
    })

}

module.exports adminController
