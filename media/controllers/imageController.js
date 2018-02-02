// Global image specifications.
// TODO configure for multiple image sizes.
const height = 450
const width = 600

const Jimp = require('jimp')
const multer = require('multer')
const crypto = require('crypto')
const mime = require('mime')

// Custom storage method, for storing images along with activityID and files
// extension.
const storage = multer.diskStorage({
    destination: (req,res,cb) => {
        cb(null, 'images/')
    },
    filename: (req,file,cb) => {
        crypto.pseudoRandomBytes(6, (err,raw) => {
            var name = req.body.activityID + '_' + raw.toString('hex') + '.' +
                   mime.getExtension(file.mimetype)
            cb(err, err ? undefined : name)
        })
    }
})

const upload = multer({storage: storage})

// Image processing function, it returns a promise with the generated file name.
function process(destination, filename ,caption) {
    var filepath = destination + filename
    return Jimp.read(filepath)
        .then( (image) => {
            return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)
            .then( (font) => {
                image.resize(Jimp.AUTO,height)
                     .cover(width,height,Jimp.HORIZONTAL_ALIGN_CENTER,Jimp.VERTICAL_ALIGN_MIDDLE)
                     .print(font,10,10,caption,width/2)
                     .write(filepath);
                return Promise.resolve(filename)
            })
        })
        .catch( (err) => {
            console.error(err)
        })
}

// A controller that accepts up to 8 images, converts them according to spec and
// returns an array of filenames as a response.
function imageController(app) {
    app.post('/images', upload.array('images',8), (req,res) => {
        ops = []
        for(var i=0, k=req.files.length; i<k; i++) {
            ops.push(process(req.files[i].destination,
                             req.files[i].filename,
                             req.body.activityName))
        }
        Promise.all(ops).then( (filenames) => {
            res.send(filenames)
        })
    })
}

module.exports = imageController
