const express = require('express')
const cookieParser = require('cookie-parser')
const users = require('./routes/users')
const auth = require('./routes/auth')

const app = express()
app.use([express.json(), cookieParser()])
app.use('/users', users)
app.use('/auth', auth)

module.exports = app