const express = require('express')
const upload = require('../configs/multer')
const { detectFulltext } = require('../utils/fizzbuzz')
const { sendAuthorizationEmail } = require('../utils/sgMail')

const router = express.Router()

module.exports = router

// /api Routes

router.post('/upload', (req, res, next) => {
  if (req?.session?.authorized) {
    next()
  } else {
    res.json({ authorized: false, message: 'You are not Authorized"' })
  }
  return null
})

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    detectFulltext(req.file.buffer).then((base64Image) => {
      res.json({ image: base64Image })
    })
  } catch (error) {
    console.log(error)
    res.json({ messge: 'error' })
  }
  return null
})

router.post('/generatecode', (req, res) => {
  const email = req.body.email
  const code = Math.floor(Math.random() * 1e6)
  req.session.code = code
  req.session.authorized = false
  sendAuthorizationEmail(email, code)
  res.json({ message: 'Code Generated' })
  console.log(req.session)
  return null
})

router.post('/authorize', (req, res) => {
  const code = parseInt(req.body.code)
  if (req.session.code === code) {
    req.session.authorized = true
    res.json({ authorized: true })
  } else {
    res.json({ authorized: false })
  }
})

router.get('/checkauth', (req, res) => {
  if (req?.session?.authorized) {
    res.json({ authorized: true })
  } else {
    res.json({ authorized: false })
  }
  return null
})
