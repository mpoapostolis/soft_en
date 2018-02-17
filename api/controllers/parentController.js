function parentController(app, db) {

    app.post('/booking/:listingID', app.loggedIn, (req,res) => {
        // TODO Implement the booking of an activity listing according to spec.
        // UserID in req.headers.UserID
        // listingID in req.params.listingID
        res.send('TODO')
    })

    app.post('/wallet', app.loggedIn, (req, res) => {
        // TODO Implement error responses.

        // Initiate transaction.
        db.sequelize.transaction((t) => {
            // Lock parent table row.
            return db.parent.findById(
                req.headers.UserID, {
                    transaction: t,
                    lock: t.LOCK.UPDATE
                }
            ).then((p) => {
                // Ensure top up amount is a valid number.
                let amount = parseInt(req.body.Amount) || 0
                amount = (amount > 0) ? amount : 0

                // Top up account balance.
                p.Balance += amount

                // And commit transaction.
                return p.save({
                    transaction: t
                }).then((p) => {
                    res.send({ "Balance": p.Balance })
                })
            })
        })
    })

    app.get('/wallet', app.loggedIn, (req,res) => {
        var response = {}
        db.parent.findById(
            req.headers.UserID, {
                attributes: [ "Balance", "BonusPoints" ]
            }
        ).then((r) => {
            Object.assign(response,r.dataValues)

            // TODO Add options for result pagination.
            db.books.findAll({
                where: {
                    ParentID: req.headers.UserID
                },
                attributes: ["Quantity"],
                include: [{
                    model: db.listing,
                    as: 'listing',
                    attributes: ["EventDate"],
                    include: {
                        model: db.activity,
                        as: 'activity',
                        attributes: ["Name", "Price"]
                    }
                }]
            }).then( (r) => {
                // TODO Restructure response according to spec.
                Object.assign(response,{ "bookings": r })
                res.send(response)
            })
        })
    })
}

module.exports = parentController
