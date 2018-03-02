function adminController(app,db) {

    app.get('/admin/user/', app.loggedIn, app.isAdmin, (req,res) => {
        db.user.findAll()
        .then( (users) => {
            res.status(200).send(users)
        }).catch((err) => {
            res.status(404).send('Users not found: ' + err)
        })
    })

    app.get('/admin/user/:UserID', app.loggedIn, app.isAdmin, (req,res) => {
        db.user.findById(req.params.UserID)
        .then( (user) => {
            res.send(user)
        }).catch((err) => {
            res.status(404).send('User not found: ' + req.params.UserID + " || " + err)
        })
    })

    app.put('/admin/user/:UserID', app.loggedIn, app.isAdmin, (req,res) => {
        db.sequelize.transaction((t) => {
            return db.user.findById(
                req.params.UserID,
                {
                    transaction: t,
                    lock: t.LOCK.UPDATE
                }
            )
            .then((user) => {
                user.Status = req.body.Status || user.Status
                return user.save({transaction: t}).then(() => {
                    res.status(200).send('User status updated')
                })
            })
            .catch((err) => {
                res.status(404).send('User not found')
                throw new Error()
            })
        })
    })

    app.delete('/admin/user/:UserID', app.loggedIn, app.isAdmin, (req,res) => {
        db.user.findById(req.params.UserID)
        .then((user) => {
            user.destroy()
            .then(() => {
                res.status(200).send('Successful user deletion')
            })
        })
    })

    app.post('/admin/user/', app.loggedIn, app.isAdmin, (req,res) => {
        res.send('TODO')
    })

    app.get('/admin/activity/', app.loggedIn, app.isAdmin, (req,res) => {
        db.activity.findAll()
        .then( (activities) => {
            res.status(200).send(activities)
        }).catch((err) => {
            res.status(404).send('Activities not found: ' + err)
        })
    })

    app.get('/admin/activity/:ActivityID', app.loggedIn, app.isAdmin, (req,res) => {
        db.activity.findById(req.params.ActivityID)
        .then( (activity) => {
            res.status(200).send(activity)
        }).catch((err) => {
            res.status(404).send('Activity not found: ' + req.params.ActivityID + " || " + err)
        })
    })

    app.get('/admin/books/', app.loggedIn, app.isAdmin, (req,res) => {
        db.books.findAll()
        .then( (books) => {
            res.status(200).send(books)
        }).catch((err) => {
            res.status(404).send('Books not found: ' + err)
        })
    })

    app.get('/admin/books/:BookID', app.loggedIn, app.isAdmin, (req,res) => {
        db.books.findById(req.params.BookID)
        .then( (book) => {
            res.send(book)
        }).catch((err) => {
            res.status(404).send('Book not found: ' + req.params.BookID + " || " + err)
        })
    })

    app.get('/admin/listing/', app.loggedIn, app.isAdmin, (req,res) => {
        db.listing.findAll()
        .then( (listings) => {
            res.status(200).send(listings)
        }).catch((err) => {
            res.status(404).send('Listings not found: ' + err)
        })
    })

    app.get('/admin/user/:ListingID', app.loggedIn, app.isAdmin, (req,res) => {
        db.listing.findById(req.params.ListingID)
        .then( (listing) => {
            res.send(listing)
        }).catch((err) => {
            res.status(404).send('Listing not found: ' + req.params.ListingID + " || " + err)
        })
    })

    app.get('/admin/review/', app.loggedIn, app.isAdmin, (req,res) => {
        db.review.findAll()
        .then( (reviews) => {
            res.status(200).send(reviews)
        }).catch((err) => {
            res.status(404).send('Reviews not found: ' + err)
        })
    })

    app.get('/admin/review/:ReviewID', app.loggedIn, app.isAdmin, (req,res) => {
        db.review.findById(req.params.ReviewID)
        .then( (review) => {
            res.send(review)
        }).catch((err) => {
            res.status(404).send('Review not found: ' + req.params.ReviewID + " || " + err)
        })
    })

}

module.exports = adminController
