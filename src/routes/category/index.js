'use strict'

const express = require('express')
const router = express.Router()

const CategoryController = require('../../controllers/category.controller')
const asyncHandler = require('express-async-handler')
const { verifyToken } = require('../../middlewares/auth/checkAuthor')


// PRIVATE ROUTER
router.use(verifyToken)

// create new post
router.post('/create', asyncHandler(CategoryController.createCategory))

// login
router.get('/get-all', asyncHandler(CategoryController.getAllCategory))

module.exports = router