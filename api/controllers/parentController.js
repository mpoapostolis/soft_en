function parentController(app, db) {

    app.get('/parent/calendar', app.loggedIn, app.isParent, (req,res) => {
        db.books.findAll({
            where: {
                ParentID: req.headers.UserID
            },
            attributes: [
                [db.sequelize.col('Quantity'),"Quantity"],
                [db.sequelize.col('EventDate'),"EventDate"],
                [db.sequelize.col('Name'),"ActivityName"],
                [db.sequelize.col('Price'),"Price"]
            ],
            includeIgnoreAttributes: false,
            include: [{
                model: db.listing,
                includeIgnoreAttributes: false,
                include: {
                    model: db.activity
                }
            }]
        })
        .then((r) => {
            res.send(r)
        })
        .catch((err) => {
            console.error(err)
            res.send('ERR')
        })
    })

    // TODO Ping the mail service for a confirmation email.
    app.post('/booking/:listingID', app.loggedIn, app.isParent, (req,res) => {
        var data = { Quantity: parseInt(req.body.Quantity) || 0 }

        // Begin transaction
        db.sequelize.transaction( (t) => {
            // Get parent details.
            return db.parent.findById(
                req.headers.UserID, {
                    transaction: t,
                    lock: t.LOCK.UPDATE
                }
            )
            .then( (parent) => {
                // Get activity listing details.
                return db.listing.findById(
                    req.params.listingID,{
                        transaction: t,
                        lock: t.LOCK.UPDATE
                    }
                ).then( (listing) => {
                    // Get activity details.
                    return db.activity.findById(
                        listing.ActivityID,{
                            transaction: t,
                            lock: t.LOCK.UPDATE
                        }
                    ).then( (activity) => {

                        return db.owner.findById(
                            activity.OwnerID, {
                                transaction: t,
                                lock: t.LOCK.UPDATE
                            }
                        ).then( (owner) => {
                            data.Price = activity.Price
                            data.Cost = data.Quantity*data.Price

                            let cost = data.Quantity*data.Price

                            // Check if the tickets can be bought.
                            if( (data.Quantity>0) &&
                                (cost<=parent.Balance) &&
                                (data.Quantity<=listing.Remaining)
                            ) {
                                // If so update balances and commit transaction.
                                owner.Balance += cost/10
                                parent.Balance -= cost
                                listing.Remaining -= data.Quantity
                                return parent.save({transaction: t}).then(() => {
                                    return listing.save({transaction: t}).then(()=>{
                                        return owner.save({transaction: t})
                                    })
                                })
                            }
                            else {
                                // If the tickets cannot be bought, throw an Error
                                // to initiate the transaction rollback.
                                throw new Error()
                            }
                        })

                    })
                })
            })
        })
        // If the transaction was successful, create a booking object.
        .then( (done) => {
            console.log(data)
            db.books.create({
                ListingID: req.params.listingID,
                ParentID: req.headers.UserID,
                Quantity: data.Quantity
            }).then((booking) => {
                res.send(booking)
            } )
        })
        // Else rollback has already happened, return a simple message
        .catch( (err) => {
            res.send(err)
        })

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
