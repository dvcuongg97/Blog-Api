'use strict'

const jwt = require('jsonwebtoken')
const { AuthFailureError, BadRequestError } = require('../../helpers/response/error.response')

const HEADERS = {
    R_KEY: 'x-refresh-token',
    CLIENT_ID: 'x-client-id',
}

const verifyToken = (req, res, next) => {

    // token check
    const token = req.headers[HEADERS.R_KEY]
    if (!token) throw new BadRequestError('R_KEY Not Found')
    // usr id check
    const usrId = req.headers[HEADERS.CLIENT_ID]
    if (!usrId) throw new BadRequestError('User Id Not Found')

    const decode = jwt.verify(token, process.env.SERCRET_KEY)
    if (!decode) throw new AuthFailureError('Invalid Token')
    if (decode._id = usrId) {
        next()
    } else {
        throw new AuthFailureError('User Id Invalid');
        // next()

    }
    // return next()
}

module.exports = {
    verifyToken
}