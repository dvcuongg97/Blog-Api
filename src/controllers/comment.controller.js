'use strict'

const CommentService = require("../services/comment.service")
const { CREATED, SuccessResponse } = require("../helpers/response/success.response")


class CommentController {

    //
    static async create(req, res, next) {
        new CREATED({
            message: "Registered OK",
            metadata: await CommentService.create(req.body),
            options: {
                limit: 10
            }
        }).send(res)
    }

    //
    static async edit(req, res, next) {
        new SuccessResponse({
            metadata: await CommentService.edit(req)
        }).send(res)
    }
    //
    static async fetch(req, res, next) {
        new SuccessResponse({
            metadata: await CommentService.fetch(req.body)
        }).send(res)
    }
    //
    static async del(req, res, next) {
        new SuccessResponse({
            metadata: await CommentService.del(req.body)
        }).send(res)
    }

}

module.exports = CommentController