const pageSize = 20

function publicController(app, db) {

    // Geoquery builder function. Distance must be supplied in kilometers.
    function geoQuery(lat,long,distance) {
        return db.sequelize.where(
            db.sequelize.fn(
                'ST_Distance',
                db.sequelize.col('Coordinates'),
                db.sequelize.fn(
                    'ST_GeogFromText',
                    `SRID=4326;POINT(${lat} ${long})`
                )
            ), {[db.sequelize.Op.lte]: distance*1000}
        )
    }

    app.get('/activity', (req, res) => {

        // Initialize query object.
        query = {}

        // Initialize query where clauses.
        var clauses = []

        // If a location is supplied, construct the respective geoquery
        if(req.query.Lat && req.query.Long) {
            // If a distance in KM is supplied, use it, else default to 5 KM.
            req.query.Distance = parseInt(req.query.Distance) || 5
            clauses.push(geoQuery(req.query.Lat,req.query.Long,req.query.Distance))
        }

        if(parseInt(req.query.MaxPrice)) {
            clauses.push({ Price: { [db.sequelize.Op.lte]: parseInt(req.query.MaxPrice) } })
        }

        if(parseInt(req.query.MinPrice)) {
            clauses.push({ Price: { [db.sequelize.Op.gte]: parseInt(req.query.MinPrice) } })
        }

        // If a search query is supplied, check if the contained words match any
        // activity name or its associated tags. :)
        if (req.query.search) {
            // REGEXP <3
            // TODO Sanitize to keep only letters
            let words = req.query.search.split(' ').join('|')

            clauses.push(
                db.sequelize.or.apply(this,[
                    { Name: { [db.sequelize.Op.iRegexp]: words } },
                    db.sequelize.where(
                        db.sequelize.col('Tag'),
                        { [db.sequelize.Op.iRegexp]: words }
                    )
                ])
            )
        }

        // Apply 'where' clauses to query object.
        Object.assign(query,{ where: db.sequelize.and.apply(this,clauses) })

        // Optional pagination with a fixed page size of 20 results.
        if(req.query.Page) {
            let Page = Math.max(parseInt(req.query.Page),0)
            Object.assign(query,{ offset: (Page-1)*pageSize, limit: pageSize })
        }

        Object.assign(query,{
            attributes: [["Name","ActivityName"],"Price","Pictures"],
            includeIgnoreAttributes: false,
            include: [
                {
                    model: db.owner
                }, {
                    model: db.listing
                }, {
                    model: db.tag
                }
            ]
        })

        if (parseInt(req.query.Date)) {
            // Get the start of the desired date.
            // WARN: Expects a millisecond timestamp.
            let date = new Date(parseInt(req.query.Date))
            date.setHours(0,0,0,0)

            Object.assign(query.include[1],{
                where: db.sequelize.where(
                    db.sequelize.fn(
                        'date_trunc',
                        'day',
                        db.sequelize.col('"EventDate"')
                    ),
                    db.sequelize.fn(
                        'to_timestamp',
                        date.getTime()/1000
                    )
                )
            })
        }

        db.activity.findAll(query)
        .then((r)=>{
            res.status(200).send(r)
        }).catch((err) => {
            res.status(404).send('Fail at query: ' + err)
        }
    })

    app.get('/activity/:id', (req, res) => {
        // TODO Optimize response according to spec.
        var response = {}
        db.activity.findById(req.params.id, {
            attributes: [
                ["Name","ActivityName"],
                "Description",
                "Price",
                "Duration"
            ],
            include: [
                {
                    model: db.owner,
                    attributes: ["CompanyName","Address"]
                }
            ]
        }).then( (result) => {
            Object.assign(response, result.dataValues)
            db.listing.findAll({
                where: {
                    ActivityID: req.params.id,
                    EventDate: {
                        // Ignore past listings.
                        [db.sequelize.Op.gt]: new Date()
                    },
                    Remaining: {
                        // Ignore listings without remaining tickets.
                        [db.sequelize.Op.gt]: 0
                    }
                },
                attributes: { exclude: ["ActivityID"]}
            }).then( (result) => {
                Object.assign(response,{ "Listings": result })
                res.status(200).send(response)
            })
        }).catch( (err) => {
            res.status(404).send('No activity with uuid: ' + req.params.id)
        })
    })
}

module.exports = publicController
