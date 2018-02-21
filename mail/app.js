const transporter = require('./controllers/mailController')
const converter = require('./controllers/pdfController')

// DUMMY DATA
const dummy_data = {
    "CustomerName": 'Kostas Karamanlis',
    "Email": "straw.leaves@gmail.com",
    "Date": "2018-04-01",
    "tickets": [
        {
            ticketNo: 324323,
            activityName: 'Karagounis Champions Soccer Academy',
            price: 100,
            quantity: 2,
            total: 200
        },
        {
            ticketNo: 465342,
            activityName: 'Nakas Choir',
            price: 100,
            quantity: 2,
            total: 200
        }
    ]
}

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.post('/receipt', (req,res) => {
    // data = {}
    // Object.assign(data,req.body)

    console.log('GOT REQUEST')

    console.log(req.headers)

    console.log(req.body)

    data = Object.assign({},req.body)

    converter(data).toStream((err,stream) => {
        let message = {
            from: 'GoKiddo <straw.leaves@gmail.com>',
            to: '<straw.leaves@gmail.com>',
            // to: data.Email || '<straw.leaves@gmail.com>',
            subject: 'Your receipt',
            text: data.text || 'wut',
            html: data.html || '<p>LOL</p>',
            attachments: [
                {
                    filename: 'receipt.pdf',
                    content: stream,
                    contentType: 'application/pdf'
                }
            ]
        }
        transporter.sendMail(message,(err,info) => {
            if(err) {
                res.status(500).send('ERR')
            }
            else {
                res.status(200).send('Mail sent')
            }
        })
    })
})

app.listen(PORT)
