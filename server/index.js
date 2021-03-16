const express = require('express')
const next = require('next')
const multer = require('multer')
const session = require('./session-config')
const cors = require('cors')

const { sendAuthorizationEmail } = require('./utils')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const extRegex = new RegExp(/[\.][a-z]*$/, 'gi')
    const ext = file.originalname.match(extRegex)[0].slice(1)
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`)
  },
})

const upload = multer({ storage })

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT =process.env.PORT || 3000

app.prepare().then(() => {
  const server = express()
  server.use(cors())

  server.use(express.json())
  server.use(express.urlencoded({ extended: false }))
  server.use(session)

  server.post('/api/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    res.json({ success: true })
    return null
  })

  server.post('/api/generatecode', (req, res) => {
    const email = req.body.email
    const code = Math.floor(Math.random() * 1e6)
    req.session.code = code
    req.session.authorized = false
    // sendAuthorizationEmail(email, code)
    res.json({ message: 'Code Generated' })
    console.log(req.session)
    return null
  })

  server.post('/api/authorize', (req, res) => {
    const code = parseInt(req.body.code)
    if (req.session.code === code) {
      req.session.authorized = true
      res.setHeader('set-Cookie', 'test')
      res.json({ authorized: true })
    } else {
      res.json({ authorized: false })
    }
  })

  server.get('/api/checkauth', (req, res) => {
    if (req?.session?.authorized) {
      res.json({ authorized: true })
    } else {
      res.json({ authorized: false })
    }
    return null
  })

  server.get('/api/state', (req, res) => {
    if (req?.session?.authorized) {
      res.json({ authorized: true })
    } else {
      res.json({ authorized: false })
    }
    return null
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT, (err) => {
    if (err) throw err
    console.log('Ready on http://localhost:3000')
  })
})
