const express = require('express')
const session = require('./session')
const cors = require('cors')

const server = express()
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(session)

module.exports = server
