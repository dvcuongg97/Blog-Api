'use strict'

const express = require('express')
const router = express.Router()
// const asyncHandler = require('express-async-handler')


// const AccessController = require('../controllers/access.controller')

// access router
router.use('/api/v1/access', require('./access'))

router.use('/api/v1/user', require('./user'))

router.use('/api/v1/category', require('./category'))

router.use('/api/v1/post', require('./post'))

router.use('/api/v1/comment', require('./comment'))

router.use('/api/v1/upload', require('./cloudinary'))




module.exports = router