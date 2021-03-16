const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const connection = require('./db/connection')

const fileStoreOptions = {
  knex: connection,
  createtable: true
}

const sessionConfig = session({
  secret: 'something crazy',
  store: new KnexSessionStore(fileStoreOptions),
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
})

module.exports = sessionConfig
