const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const FormData = require('form-data')

function ownerController(app,db) {

    app.get('/owner/wallet', app.loggedIn, (req,res) => {
        // TODO Implement owner wallet according to spec.
        // UserID in req.headers.UserID
        res.send('TODO')
    })

    app.get('/statistics', app.loggedIn, (req,res) => {
        // TODO Implement owner statistics according to spec.
        // UserID in req.headers.UserID
        res.send('TODO')
    })

    app.get('/statistics/:activityID', app.loggedIn, (req,res) => {
        // TODO Implement owner statistics according to spec.
        // UserID in req.headers.UserID
        // activityID in req.params.activityID
        res.send('TODO')
    })

    // Register a new activity as an owner.
    app.post('/activity', app.loggedIn, upload.array('image',8), (req,res) => {

        // TODO Check if owner.
        // TODO Check for unique name.
        // TODO Implement coordinates and tags.
        let point = { type: 'Point', coordinates: [req.body.long, req.body.lat]}
        db.activity.create({
            Name: req.body.Name,
            AgeGroups: req.body.AgeGroups,
            Description: req.body.Description,
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
