function publicController(app, db) {

    app.get('/activity', (req, res) => {
        // TODO Implement activity search according to spec.
        // Query parameters found in req.query.
    })


    app.get('/activity/:id', (req, res) => {
        // TODO Optimize response according to spec.
        db.activity.findById(req.params.id, {
            include: [{
                model: db.listing
            }]
        }).then((result) => {
            res.send(result)
        })
    })
}


module.exports = publicController
