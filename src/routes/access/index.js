'use strict'

const express = require('express')
const router = express.Router()

const AccessController = require('../../controllers/access.controller')
const asyncHandler = require('express-async-handler')
const passport = require('passport')


// register
router.post('/register', asyncHandler(AccessController.register))
// login
router.post('/login', asyncHandler(AccessController.login))
// send mail
router.post('/send-email-to/:email', asyncHandler(AccessController.sendMail))
// email verify
router.post('/email-verify/:email/:token', asyncHandler(AccessController.verifyEmail))


// google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))
// google callback
router.get('/google/callback', passport.authenticate('google'))
//  router.post('/google/callback', (req, res) => res.send())


module.exports = router