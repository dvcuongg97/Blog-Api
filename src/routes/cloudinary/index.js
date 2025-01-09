'use strict'

const express = require('express')
const router = express.Router()

const asyncHandler = require('express-async-handler')
const passport = require('passport')
const multerDisk = require('../../configs/multer.config.js')
const CloudinaryController = require('../../controllers/cloudinary.controller.js')
const multer = require('multer')

// profile
router.use(passport.authenticate('jwt', { session: false }))
//
router.post('/cloudinary/path', asyncHandler(CloudinaryController.uploadClodinary))
//

router.post('/local', multerDisk.singleUpload, asyncHandler(CloudinaryController.uploadLocal))


module.exports = router