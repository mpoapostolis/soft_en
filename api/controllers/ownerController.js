const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const FormData = require('form-data')

function ownerController(app,db) {

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
            res.send(o)
        })
        .catch( (err) => {
            res.send('No such owner.')
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
                res.send(l)
            })
        })
        .catch( (err) => {
            console.error(err)
            res.send('No activities found!')
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
                    res.send(l)
                })
            }
            else {
                // Else, respond to the raskal owner accordingly.
                res.send('Not the owner of the activity')
            }
        })
        .catch((err) => {
            console.error(err)
            res.send('No such activity')
        })
    })

    app.post('/activity/:activityID', app.loggedIn, (req,res) =>{
        // TODO Implement listing creation according to spec.
        // UserID in req.headers.UserID
        // activityID in req.params.activityID
        res.send('TODO')
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
                    res.send('Error')
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
                            res.send('Pictures saved')
                        })
                    })
                }
            })
        })
    })
}

module.exports = ownerController
