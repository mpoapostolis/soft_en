const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const FormData = require('form-data')
const mediaOptions = require('../config/mediaService.json')
const tags = require('../config/tagValues.json')

const imagepath = '/opt/images/'
function parsePictures(pictures) {
    if(pictures) {
        return pictures.split(',').map((x) => {
            return imagepath + x
        })
    }
    else { return [] }
}

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
            res.status(404).send('No activities found')
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
                        attributes: ["ActivityID",["Name","ActivityName"],"Price","Pictures"]
                    }
                ]
            }
        )
        .then( (o) => {
            o.activities.map((act) => {
                act.Pictures = parsePictures(act.Pictures)
            })
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
                                } / 10`
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

        let list = req.body.Listings || []
        if (typeof list === 'string') {
            list = JSON.parse(list) || []
        }

        // Transform received data to database specs.
        let inserted = list.filter((x) => { return x.EventDate >= Date.now() })
                           .map((x) => {
                               x.ActivityID = req.params.activityID
                               x.EventDate = new Date(x.EventDate)
                               return x
                           })

        // Perform bulk insertion.
        db.listing.bulkCreate(inserted)
        .then((insertions) => {
            if (insertions) {
                res.status(201).send('Listings saved')
            } else {
                res.status(400).send('No isertions')
            }
        })
        .catch((err) => {
            console.error(err)
            res.status(400).send('Listings not saved')
        })
    })

    // Register a new activity as an owner.
    app.post('/activity', app.loggedIn, app.isOwner, upload.array('image',8), (req,res) => {

        let point = { type: 'Point', coordinates: [req.body.lat, req.body.long]}
        let _tags = (req.body.Tag || '').split(',')

        // For now, ignore duplicate or unaccepted tags.
        _tags = [...new Set(_tags)].filter(x => new Set(tags).has(x));

        db.activity.create(
            {
                Name: req.body.Name,
                MinAge: req.body.MinAge,
                MaxAge: req.body.MaxAge,
                Description: req.body.Description,
                Price: req.body.Price,
                Duration: req.body.Duration,
                Coordinates: point,
                OwnerID: req.headers.UserID,
                Pictures: 'Processing',
                tags: _tags.map( (x) => { return { "Tag": x } })
            },
            {
                include: [{
                    model: db.tag
                }]
            }
        )
        .then( (act) => {
            // Upon creation of basic details, forward pictures to the media
            // service.
            var form = new FormData({
                maxDataSize: 20 * 1024 * 1024
            })

            // Include the activity name first.
            form.append('activityName',req.body.Name)

            for (let i=0, l=req.files.length; i<l; i++) {
                form.append(
                    'image',
                    req.files[i].buffer,
                    { filename: req.files[i].originalname }
                )
            }

            let options = Object.assign(
                { headers: form.getHeaders() },
                mediaOptions
            )

            // Submit them to the media service.
            form.submit(options, (err,result) => {
                if (err) {
                    console.error(err)
                    result.resume()
                    res.status(500).send('Pictures not saved')
                } else {
                    // Parse response body, an array of image names.
                    var body = '';
                    result.setEncoding('utf8');

                    // Manually parse body response.
                    result.on('data', (chunk) => { body += chunk });

                    result.on('end', () => {
                        // Store image names in the database.
                        result.resume()
                        body = JSON.parse(body);
                        act.Pictures = body.join(',')
                        act.save().then( () => {
                            res.status(201).send(act.ActivityID)
                        })
                    })
                }
            })
        })
        .catch( (err) => {
            console.error(err)
            res.status(400).send('Bad Request')
        })
    })
}

module.exports = ownerController
