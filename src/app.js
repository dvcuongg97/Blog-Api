'use strict'

const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const { corsOptions } = require('./configs/cors.config')
const passport = require('passport')
const session = require('express-session')

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

// const cookieSession = require('cookie-session');

// app.use(cookieSession({
//     name: 'google-auth-session',
//     keys: ['key1', 'key2']
// }));


app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 24 * 60 * 60 * 1000 }
    })
)

// passport auth
require('./helpers/passport/google.stragegy.passport')
require('./helpers/passport/jwt.strategy.passport')

app.use(passport.initialize())
app.use(passport.session())

// db connection
require('./dbs/mongo.connect')

// router
app.use('/', require('./routes'))

//handle errors
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'Error',
        code: statusCode,
        stack: error.stack,
        message: error.message || 'Internal Server Error'
    })
})

module.exports = app