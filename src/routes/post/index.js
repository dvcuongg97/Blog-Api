'use strict'

const express = require('express')
const router = express.Router()

const PostController = require('../../controllers/post.controller')
const asyncHandler = require('express-async-handler')
const { verifyToken } = require('../../middlewares/auth/checkAuthor')
const passport = require('passport')


// PUBLIC ROUTER//
// get all
router.get('', asyncHandler(PostController.allPost))
// search
router.get('/search', asyncHandler(PostController.searchPost))


// PRIVATE ROUTER//
router.use(passport.authenticate('jwt', { session: false }))
// create 
router.post('/create', asyncHandler(PostController.create))
// update
router.patch('/update/:post/:author', asyncHandler(PostController.update))
// author post
router.get('/get-post-by-author/:author', asyncHandler(PostController.authorPost))
// delete
router.get('/delete/:post/:author', asyncHandler(PostController.delete))
//like
router.get('/delete/:post/:usr', asyncHandler(PostController.like))



module.exports = router