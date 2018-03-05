const rp = require('request-promise');
const mailOptions = require('../config/mailService.json')

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
            res.status(200).send(r)
        })
        .catch((err) => {
            console.error(err)
            res.status(404).send('Not books found.')
        })
    })

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

                            // Store some data for the receipt
                            data.Price = activity.Price
                            data.ActivityName = activity.Name
                            data.Cost = data.Quantity*data.Price
                            data.CustomerName = parent.Name
                            data.EventDate = listing.EventDate

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
            db.books.create({
                ListingID: req.params.listingID,
                ParentID: req.headers.UserID,
                Quantity: data.Quantity
            }).then((booking) => {

                let _options = Object.assign({},mailOptions)

                _options.body = {
                    "CustomerName": data.CustomerName,
                    "Date": (new Date).toDateString(),
                    "tickets": [
                        {
                            ticketNo: booking.BookingID,
                            activityName: data.ActivityName,
                            EventDate: data.EventDate,
                            price: data.Price,
                            quantity: data.Quantity,
                            total: data.Cost
                        }
                    ]
                }

                rp(_options)
                .then( (resp) => {
                    res.status(201).send(booking)
                })
                .catch( (err) => {
                    res.status(400).send('Error sending mail')
                })

            } )
        })
        // Else rollback has already happened, return a simple message
        .catch( (err) => {
            res.status(400).send('Error creating the book: ' + err)
        })

    })

    app.post('/wallet', app.loggedIn, app.isParent, (req, res) => {

        let amount = parseInt(req.body.Amount)

        if (amount > 0) {
            // Initiate transaction.
            db.sequelize.transaction((t) => {
                // Lock parent table row.
                return db.parent.findById(
                    req.headers.UserID, {
                        transaction: t,
                        lock: t.LOCK.UPDATE
                    }
                )
                .then((p) => {
                    // Top up account balance.
                    p.Balance += amount
                    p.BonusPoints += Math.trunc(amount/10)

                    // And commit transaction.
                    return p.save({
                        transaction: t
                    })
                    .then((p) => {
                        res.status(202).send({
                            "Balance": p.Balance,
                            "BonusPoints": p.BonusPoints
                        })
                    })
                    .catch((err) => {
                        res.status(400).send('Error at the transaction: ' + err)
                    })
                })
                .catch((err) => {
                    res.status(404).send('User not found!')
                })
            })
        }
        else {
            res.status(400).send('Invalid top up amount!')
        }
    })

    app.get('/wallet', app.loggedIn, app.isParent, (req,res) => {
        var response = {}
        db.parent.findById(
            req.headers.UserID, {
                attributes: [ "Balance", "BonusPoints" ]
            }
        ).then((r) => {
            Object.assign(response,r.dataValues)

            db.books.findAll({
                where: {
                    ParentID: req.headers.UserID
                },
                attributes: [
                    "Quantity",
                    [db.sequelize.col('Price'),"Price"],
                    [db.sequelize.col('EventDate'),"EventDate"],
                    [db.sequelize.col('Name'),"ActivityName"]
                ],
                includeIgnoreAttributes: false,
                include: [{
                    model: db.listing,
                    includeIgnoreAttributes: false,
                    include: [{
                        model: db.activity
                    }]
                }]
            }).then( (r) => {
                Object.assign(response,{ "bookings": r })
                res.status(200).send(response)
            }).catch((err) => {
                console.error(err)
                res.status(404).send('Bookings not found: ' + err)
            })
        })
    })
}

module.exports = parentController
