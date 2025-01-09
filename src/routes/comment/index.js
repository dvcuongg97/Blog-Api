'use strict'

const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')

const CommentController = require('../../controllers/comment.controller')
const passport = require('passport')



// PUBLIC ROUTER
router.get('', asyncHandler(CommentController.fetch))

// PRIVATE ROUTER
router.use(passport.authenticate('jwt', { session: false }))

router.post('/create', asyncHandler(CommentController.create))
router.patch('/edit/:id', asyncHandler(CommentController.edit))
router.delete('/delete/:id', asyncHandler(CommentController.del))

module.exports = router