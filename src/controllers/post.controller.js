'use strict'

const PostService = require("../services/post.service")
const { CREATED, SuccessResponse } = require("../helpers/response/success.response")


class PostController {

    static async create(req, res, next) {
        new CREATED({
            message: "OK",
            metadata: await PostService.create(req),
            options: {
                limit: 10
            }
        }).send(res)
    }

    static async update(req, res, next) {
        new SuccessResponse({
            metadata: await PostService.update(req)
        }).send(res)
    }

    static async allPost(req, res, next) {
        new SuccessResponse({
            metadata: await PostService.allPost(req.query)
        }).send(res)
    }

    static async authorPost(req, res, next) {
        new SuccessResponse({
            metadata: await PostService.authorPost(req.params)
        }).send(res)
    }

    static async searchPost(req, res, next) {
        new SuccessResponse({
            metadata: await PostService.searchPost(req.query)
        }).send(res)
    }
    static async delete(req, res, next) {
        new SuccessResponse({
            metadata: await PostService.delete(req.params)
        }).send(res)
    }
    static async like(req, res, next) {
        new SuccessResponse({
            metadata: await PostService.like(req.params)
        }).send(res)
    }
}

module.exports = PostController