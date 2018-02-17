function publicController(app, db) {

    app.get('/activity', (req, res) => {
        // TODO Implement activity search according to spec.
        // Query parameters found in req.query.
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
                res.send(response)
            })
        }).catch( (err) => {
            res.send('No activity with uuid: ' + req.params.id)
        })
    })
}


module.exports = publicController
