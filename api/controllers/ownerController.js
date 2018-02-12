const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const FormData = require('form-data')

function ownerController(app,db) {

    // Register a new activity as an owner.
    app.post('/activity', app.loggedIn, upload.array('image',8), (req,res) => {

        // TODO Check if owner.
        // TODO Check for unique name.
        // TODO Implement coordinates and tags.
        db.activity.create({
            Name: req.body.Name,
            AgeGroups: req.body.AgeGroups,
            Description: req.body.Description,
            Coordinates: req.body.Coordinates,
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
