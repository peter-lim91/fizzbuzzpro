const next = require('next')

const server = require('./configs/server')
const apiRoutes = require('./routes/api')

const dev = process.env.NEXT_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT = process.env.PORT || 3000

app.prepare().then(() => {
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
