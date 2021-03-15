const express = require('express')
const next = require('next')
const multer = require('multer')

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

  server.post('/api/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    res.json({ received: 'yes!' })
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
