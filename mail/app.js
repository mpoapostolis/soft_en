// Use at least Nodemailer v4.1.0
const nodemailer = require('nodemailer');
const fs = require('fs');
const pdf = require('html-pdf');
const html = fs.readFileSync('./invoice.html', 'utf8');

const options = {
    'height': '396mm',
    'width': '280mm',
    'zoomFactor': "0.75"
}

const handlebars = require('handlebars')
const template = handlebars.compile(html)

const data = {
    "CustomerName": 'Kostas Karamanlis',
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

const result = template(data)

// Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // Create a SMTP transporter object
    const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });


    pdf.create(result,options).toStream(function(err, stream){

        // Message object
        let message = {
            from: 'GoKiddo <sender@example.com>',
            to: 'Someone <someone@example.com>',
            subject: 'Your receipt ✔',
            text: 'Hello to myself!',
            html: '<p><b>Thanks</b> to myself!</p>',
            attachments: [
                {   // stream as an attachment
                    filename: 'receipt.pdf',
                    content: stream,
                    contentType: 'application/pdf'
                }
            ]
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
});
