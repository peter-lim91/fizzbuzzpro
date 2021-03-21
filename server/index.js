const express = require('express')
const next = require('next')
const session = require('./configs/session')
const cors = require('cors')

const apiRoutes = require('./routes/api')

const dev = process.env.NEXT_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT = process.env.PORT || 3000

app.prepare().then(() => {
  //server setup
  const server = express()
  server.use(cors())
  server.use(express.json())
  server.use(express.urlencoded({ extended: false }))
  server.use(session)

  //server routes
  server.use('/api', apiRoutes)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT, (err) => {
    if (err) throw err
    console.log('Server Ready!')
  })
})
