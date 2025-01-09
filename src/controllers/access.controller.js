'use strict'

const AccessService = require("../services/access.service")
const { CREATED, SuccessResponse } = require("../helpers/response/success.response")


//
const register = async (req, res, next) => {
    new CREATED({
        message: "Registered OK",
        metadata: await AccessService.register(req.body),
        options: {
            limit: 10
        }
    }).send(res)
}

const login = async (req, res, next) => {
    new SuccessResponse({
        metadata: await AccessService.login(req.body)
    }).send(res)
}

const sendMail = async (req, res, next) => {
    new SuccessResponse({
        metadata: await AccessService.sendMail(req.params)
    }).send(res)
}

const verifyEmail = async (req, res, next) => {
    new SuccessResponse({
        metadata: await AccessService.verifyEmail(req.params)
    }).send(res)
}

module.exports = {
    register, login, verifyEmail, sendMail
}