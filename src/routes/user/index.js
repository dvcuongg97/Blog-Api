'use strict'

const express = require('express')
const router = express.Router()

const UserController = require('../../controllers/user.controller.js')
const asyncHandler = require('express-async-handler')
const passport = require('passport')

// profile
router.use(passport.authenticate('jwt', { session: false }))
router.get('/profile/:id', asyncHandler(UserController.fetchProfile))
// update
router.patch('/update/:id', asyncHandler(UserController.update))
// get post by author
router.delete('/delete/:id', asyncHandler(UserController.delete))



module.exports = router