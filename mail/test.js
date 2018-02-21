const converter = require('./controllers/pdfController')

// DUMMY DATA
const data = {
    "CustomerName": 'Kostas Karamanlis',
    "Email": "straw.leaves@gmail.com",
    "Date": "2018-04-01",
    "total": 400,
    "tickets": [
        {
            ticketNo: 324323,
            activityName: 'Karagounis Champions Soccer Academy',
            EventDate: new Date(),
            price: 100,
            quantity: 2,
            total: 200
        },
        {
            ticketNo: 465342,
            activityName: 'Nakas Choir',
            EventDate: new Date(),
            price: 100,
            quantity: 2,
            total: 200
        }
    ]
}

converter(data).toFile('./test.pdf', (err, res)=> {
  if(err) {
    console.log(err)
  } else {
    console.log('done')
  }
})
