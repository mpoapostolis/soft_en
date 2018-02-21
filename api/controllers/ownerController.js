const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const FormData = require('form-data')

function ownerController(app,db) {

    app.get('/owner/calendar', app.loggedIn, app.isOwner, (req,res) => {
        db.activity.findAll({
            where: {
                OwnerID: req.headers.UserID
            }
        })
        .then( (activities) => {

            let acts = activities.map( (a) => { return a.ActivityID })

            db.listing.findAll({
                where: {
                    ActivityID: {
                        [db.sequelize.Op.in]: acts
                    }
                },
                attributes:[
                    [db.sequelize.col("Name"),"ActivityName"],
                    "EventDate",
                    [db.sequelize.col("Price"),"Price"],
                    [
                        db.sequelize.fn(
                            'coalesce',
                            db.sequelize.fn('SUM',db.sequelize.col("Quantity")),
                            0
                        ),
                        "ticketsSold"
                    ]
                ],
                raw:true,
                group: [
                    db.sequelize.col('"listing"."ListingID"'),
                    db.sequelize.col('"activity"."ActivityID"')
                ],
                includeIgnoreAttributes: false,
                include: [
                    {
                        model: db.books
                    },
                    {
                        model: db.activity
                    }
                ]
            })
            .then( (r) => {
                res.status(200).send(r)
            })
            .catch((err) => {
                console.error(err.error)
                res.status(404).send('No listings found')
            })
        })
        .catch( (err) => {
            res.status(404) send('No activities found')
        })
    })

    // Get owner wallet details.
    app.get('/owner/wallet', app.loggedIn, app.isOwner, (req,res) => {
        db.owner.findById(
            req.headers.UserID,{
                attributes: [["Balance","Monthly Balance"]],
                include: [
                    {
                        model: db.activity,
                        attributes: [["Name","ActivityName"],"Price","Pictures"]
                    }
                ]
            }
        )
        .then( (o) => {
            res.status(200).send(o)
        })
        .catch( (err) => {
            res.status(404).send('No such owner.')
        })
    })

    // A helper function for generating statistics.
    // It takes a db object and a list of activityIDs to track income statistics
    // for.
    //
    // Returns a promise of the db query response.
    function getStatistics(db,activities) {
        return db.listing.findAll({
            where: {
                ActivityID: {
                    [db.sequelize.Op.in]: activities
                }
            },
            // Required, because of sequelize shenanigans.
            raw: true,
            attributes: [
                [
                    // Truncate listing dates by month, to later group by month.
                    db.sequelize.fn(
                        'date_trunc',
                        'month',
                        db.sequelize.col('"listing"."EventDate"')
                    ),
                    "Month"
                ],
                [
                    // Calculate the sum of ticketsSold*Price.
                    db.sequelize.fn(
                        'coalesce',
                        db.sequelize.fn(
                            'sum',
                            db.sequelize.literal(
                                `${
                                    db.sequelize.col('"books"."Quantity"').col
                                } * ${
                                    db.sequelize.col('"activity"."Price"').col
                                }`
                            )
                        ),
                        0
                    ),
                    "Income"
                ],
                [
                    // Calculate the sheer number of tickets.
                    db.sequelize.fn(
                        'coalesce',
                        db.sequelize.fn(
                            'sum',
                            db.sequelize.col('"books"."Quantity"')
                        ),
                        0
                    ),
                    "Tickets"
                ]
            ],
            group: [
                // Group by month.
                db.sequelize.fn(
                    'date_trunc',
                    'month',
                    db.sequelize.col('"listing"."EventDate"')
                )
            ],
            // Don't ask.
            includeIgnoreAttributes: false,
            include: [
                {
                    model: db.books,
                    as: 'books'
                },
                {
                    model: db.activity,
                    as: 'activity'
                }
            ]
        })
    }


    app.get('/statistics', app.loggedIn, app.isOwner, (req,res) => {
        db.activity.findAll({
            where: {
                OwnerID: req.headers.UserID
            }
        })
        .then( (activities) => {
            // Isolate activity IDs.
            let acts = activities.map( (a) => { return a.ActivityID })

            // Query for statistics...
            getStatistics(db,acts)
            .then( (l) => {
                // and send them to the client.
                res.status(200).send(l)
            })
        })
        .catch( (err) => {
            console.error(err)
            res.status(404).send('No activities found!')
        })
    })

    app.get('/statistics/:activityID', app.loggedIn, app.isOwner, (req,res) => {
        db.activity.findById(req.params.activityID)
        .then((a) => {
            // Check if the user actually owns the activity.
            if (a.OwnerID === req.headers.UserID) {
                // If so, query for statistics...
                getStatistics(db,[a.ActivityID])
                .then( (l) => {
                    // and send them to the client.
                    res.status(200).send(l)
                })
            }
            else {
                // Else, respond to the raskal owner accordingly.
                res.status(403).send('Not the owner of the activity')
            }
        })
        .catch((err) => {
            console.error(err)
            res.status(404).send('No such activity')
        })
    })

    // TODO Contemplate strict validations for listing overlap.
    app.post('/activity/:activityID', app.loggedIn, app.isOwner, (req,res) => {

        let list = JSON.parse(req.body.Listings)

        // Transform received data to database specs.
        let inserted = list.filter((x) => { return x.EventDate >= Date.now() })
                           .map((x) => {
                               x.ActivityID = req.params.activityID
                               x.EventDate = new Date(x.EventDate)
                               return x
                           })

        // Perform bulk insertion.
        db.listing.bulkCreate(inserted)
        .then(() => {
            res.status(201).send('Listings saved')
        })
        .catch((err) => {
            console.error(err)
            res.status(400).send('Listings not saved')
        })
    })

    // Register a new activity as an owner.
    app.post('/activity', app.loggedIn, app.isOwner, upload.array('image',8), (req,res) => {

        // TODO Check for unique name.
        // TODO Implement tags.
        let point = { type: 'Point', coordinates: [req.body.long, req.body.lat]}
        db.activity.create({
            Name: req.body.Name,
            AgeGroups: req.body.AgeGroups,
            Description: req.body.Description,
            Price: req.body.Price,
            Duration: req.body.Duration,
            Coordinates: point,
            OwnerID: req.headers.UserID,
            Pictures: 'Processing'
        }).then( (act) => {
            // Upon creation of basic details, forward pictures to the media
            // service.
            let form = new FormData()

            // Include the activity name first.
            form.append('activityName',req.body.Name)

            // Append all images to the data form.
            req.files.map( (f) => form.append('image',
                                              f.buffer,
                                              {filename: f.originalname }))

            // Submit them to the media service.
            // TODO Use config file for server location.
            form.submit({
                host: 'media',
                port: 3000,
                path: '/images'
            }, (err,result) => {
                if (err) {
                    console.error(err)
                    res.status(400).send('Pictures not saved')
                } else {
                    // Parse response body, an array of image names.
                    var body = '';
                    result.setEncoding('utf8');

                    result.on('data', function(chunk) {
                        body += chunk;
                    });
                    result.on('end', function() {
                        // Store image names in the database.
                        body = JSON.parse(body);
                        act.Pictures = body.join(',')
                        act.save().then( () => {
                            res.status(201).send('Pictures saved')
                        })
                    })
                }
            })
        })
    })
}

module.exports = ownerController
