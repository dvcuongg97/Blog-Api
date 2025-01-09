'use strict'

require('dotenv').config()

const app = require('./src/app')

const PORT = process.env.SERVER_PORT || 8081

const server = app.listen(PORT, () => {
    console.log('Server start with port ', PORT)
})

process.on('SIGINT', () => {
    server.close(() => {
        console.log('SERVER CLOSED')
    })
})
