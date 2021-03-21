const sgMail = require('../configs/sgMail')

module.exports = { sendAuthorizationEmail }

function sendAuthorizationEmail(recipient, code) {
  const to = recipient
  const subject = 'Your FizzBuzz Pro Authorization Code'
  const text = 'Your FizzBuzz Pro Authorization Code is ' + code
  const html = `<h4>Your FizzBuzz Pro Authorization Code is <strong>${code}</strong></h4>`

  return sendEmail(to, subject, text, html).then(() => {
    console.log('email sent')
  })
}

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
