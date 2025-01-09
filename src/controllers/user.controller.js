'use strict'


const UserService = require('../services/user.service')
const { CREATED, SuccessResponse } = require("../helpers/response/success.response")

class UserController {


    static async fetchProfile(req, res, next) {
        new SuccessResponse({
            metadata: await UserService.fetchProfile(req)
        }).send(res)
    }


    static async update(req, res, next) {
        new SuccessResponse({
            metadata: await UserService.update(req)
        }).send(res)
    }
    static async delete(req, res, next) {
        new SuccessResponse({
            metadata: await UserService.delete(req.params)
        }).send(res)
    }
}

module.exports = UserController