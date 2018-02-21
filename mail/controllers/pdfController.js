const fs = require('fs');
const pdf = require('html-pdf');
const options = require('../config/pdf.json')

const handlebars = require('handlebars')
const html = fs.readFileSync('./invoice.html', 'utf8');
const template = handlebars.compile(html)

function pdfController(data) {
    let result = template(data)
    return pdf.create(result,options)
}

module.exports = pdfController
