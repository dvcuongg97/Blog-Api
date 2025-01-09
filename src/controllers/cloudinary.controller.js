'use strict'

const { SuccessResponse } = require("../helpers/response/success.response")
const { uploadClodinary, uploadLocal } = require("../services/cloudinary.service")

class CloudinaryController {
    //
    static async uploadClodinary(req, res, next) {
        new SuccessResponse({
            metadata: await uploadClodinary(req.params)
        }).send(res)
    }
    //
    static async uploadLocal(req, res, next) {
        const { file } = req
        if (!file) throw new Error('File Not Found')
        new SuccessResponse({
            metadata: await uploadLocal({ path: file.path })
        }).send(res)
    }
}

module.exports = CloudinaryController