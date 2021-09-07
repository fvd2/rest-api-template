const express = require('express')
const cookieParser = require('cookie-parser')
const users = require('./routes/users')
const posts = require('./routes/posts')
const auth = require('./routes/auth')

const app = express()
app.use([express.json(), cookieParser()])

// load routes
app.use('/users', users)
app.use('/auth', auth)
app.use('/posts', posts)

module.exports = app