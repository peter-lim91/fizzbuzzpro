const express = require('express')
const next = require('next')
const multer = require('multer')
const session = require('express-session')

const { sendAuthorizationEmail } = require('./utils')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const extRegex = new RegExp(/[\.][a-z]*$/, 'gi')
    const ext = file.originalname.match(extRegex)[0].slice(1)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`)
  },
})

const upload = multer({ storage })

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(express.json())
  server.use(express.urlencoded({ extended: false }))
  server.use(
    session({
      secret: 'keyboard cat',
      cookie: { maxAge: false },
      resave: false,
      saveUninitialized: false,
    })
  )

  server.post('/api/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    res.json({ received: 'yes!' })
    return null
  })

  server.post('/api/generatecode', (req, res) => {
    console.log(req.session)
    const email = req.body.email
    const code = Math.floor(Math.random() * 1e6)
    console.log(code)
    req.session.code = code
    req.session.authorized = false
    // sendAuthorizationEmail(email, code)
    res.json({ message: 'Code Generated' })
    console.log(req.session)
    return null
  })

  server.post('/api/authorize', (req, res) => {
    console.log(req.session)
    const code = parseInt(req.body.code)
    if (req.session.code === code) {
      req.session.authorized = true
      res.json({ authorized: true })
    } else {
      res.json({ authorized: false })
    }
    
    console.log(req.session)
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
    console.log(req.session)
    if (req?.session?.code) {
      res.json({ state: 'code', authorized: false })
    } else if (req?.session?.authorized) {
      res.json({ authorized: true })
    } else {
      res.json({ authorized: false })
    }

    // res.json({ authorized: true })
    return null
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('Ready on http://localhost:3000')
  })
})
