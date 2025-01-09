'use strict'

const CategoryService = require("../services/category.service")
const { CREATED, SuccessResponse } = require("../helpers/response/success.response")

class CategoryController {


    static async createCategory(req, res, next) {
        new CREATED({
            message: "Registered OK",
            metadata: await CategoryService.newCategory(req.body),
            options: {
                limit: 10
            }
        }).send(res)
    }

    static async getAllCategory(req, res, next) {
        new SuccessResponse({
            metadata: await CategoryService.getAllCategory()
        }).send(res)
    }
}

module.exports = CategoryController