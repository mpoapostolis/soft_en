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
        if (req.query.Lat && req.query.Long) {
            // If a distance in KM is supplied, use it, else default to 5 KM.
            req.query.Distance = parseInt(req.query.Distance) || 5
            clauses.push(geoQuery(req.query.Lat,req.query.Long,req.query.Distance))
        }

        if (parseInt(req.query.MaxPrice)) {
            clauses.push({ Price: { [db.sequelize.Op.lte]: parseInt(req.query.MaxPrice) } })
        }

        if (parseInt(req.query.MinPrice)) {
            clauses.push({ Price: { [db.sequelize.Op.gte]: parseInt(req.query.MinPrice) } })
        }

        if (parseInt(req.query.MaxAge)) {
            clauses.push({ MinAge: { [db.sequelize.Op.lte]: parseInt(req.query.MaxAge) } })
        }

        if (parseInt(req.query.MinAge)) {
            clauses.push({ MaxAge: { [db.sequelize.Op.gte]: parseInt(req.query.MinAge) } })
        }

        // TODO Contemplate tag validation before search.
        if (req.query.Tag) {
            let _tags = req.query.Tag.split(';')
            clauses.push(
                db.sequelize.where(
                    db.sequelize.col('Tag'),
                    { [db.sequelize.Op.in]: _tags }
                )
            )
        }

        // If a search query is supplied, check if the contained words match any
        // activity name or its associated tags. :)
        if (req.query.search) {
            // REGEXP <3
            let words = req.query.search.trim()
                                        .replace(/[^a-zA-Z0-9 ]/g,'')
                                        .replace(/  +/g,' ')
                                        .split(' ')
                                        .join('|')

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
        if (req.query.Page) {
            let Page = Math.max(parseInt(req.query.Page),0)
            Object.assign(query,{ offset: (Page-1)*pageSize, limit: pageSize })
        }

        Object.assign(query,{
            attributes: [
                ["Name","ActivityName"],
                "ActivityID",
                "Price",
                "Pictures",
                [db.sequelize.col('CompanyName'),"CompanyName"]
            ],
            include: [
                {
                    model: db.owner,
                    attributes: []
                }, {
                    model: db.listing,
                    attributes: []
                }, {
                    model: db.tag,
                    attributes: [[db.sequelize.col('Tag'),'Tag']]
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
        .then((r) => {
            // Make sure the response matches the doc specification.
            let response = r.map( (a) => {
                let _tags = a.dataValues.tags
                _tags = _tags.map( (t) => { return t.Tag })
                a.dataValues.tags = _tags
                return a.dataValues
            })
            res.status(200).send(response)
        })
        .catch((err) => {
            console.error(err)
            res.status(404).send('Fail at query')
        })
    })

    app.get('/activity/:id', (req, res) => {
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
                },
                {
                    model: db.tag,
                    attributes: [[db.sequelize.col('Tag'),'Tag']]
                }
            ]
        }).then( (result) => {
            Object.assign(response, result.dataValues)
            response.tags = response.tags.map( (t) => { return t.Tag } )

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
