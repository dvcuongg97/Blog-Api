'use strict'

const USER = require('../models/user.model')
const AUTH = require("../models/auth.model")
const { BadRequestError } = require('../helpers/response/error.response')
const { default: mongoose } = require('mongoose')


const HEADERS = {
    R_KEY: 'x-refresh-token',
    CLIENT_ID: 'x-client-id',
}

class UserService {

    // private router service
    static async fetchProfile(req) {
        console.log(req.params);
        const { id } = req.params

        const profile = await USER.findById(id)
        // .populate('usr_post')

        if (!profile) throw new BadRequestError('Invalid User')

        return profile
    }

    static async update(req) {
        //
        const update = req.body

        const { id } = req.params

        const newProfile = await USER.findByIdAndUpdate(id, update, { new: true })
            .select('-usr_post')
            .lean()

        if (!newProfile) throw new BadRequestError('Invalid User')

        return newProfile
    }

    static async delete({ id }) {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            await USER.deleteOne({ _id: id }, { session })
            await AUTH.deleteOne({ usr_id: id }, { session })
        } catch (error) {
            throw new Error(error.message)
        } finally {
            session.endSession();
            return 'Deleted Successful'
        }
    }


}


module.exports = UserService
