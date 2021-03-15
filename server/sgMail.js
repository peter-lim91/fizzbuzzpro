require('dotenv').config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = { sendEmail }

function sendEmail(to, subject, text, html) {
  const msg = {
    to,
    from: process.env.SENDER,
    subject,
    text,
    html,
  }
  return sgMail.send(msg)
}
