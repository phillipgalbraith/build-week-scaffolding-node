const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const usersRouter = require('./users/users-router')
const recipesRouter = require('./recipes/recipes-router')
const session = require('express-session')
const {SECRET_SESSION} = require('./secrets')
const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(session({
  secret: SECRET_SESSION,
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: true, 
  }, 
  httpOnly: true, 
  resave: false,
  saveUninitialized: false,
}))

server.use('/api/users', usersRouter)

server.use('/api/recipes', recipesRouter)

module.exports = server
