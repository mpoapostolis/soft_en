const nodemailer = require('nodemailer');
const credentials = require('../config/mail.json')

const transporter = nodemailer.createTransport(credentials)

module.exports = transporter
