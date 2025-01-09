'use strict'

// import package
const bcrypt = require('bcrypt');
require('dotenv').config()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

// import module
const USER = require('../models/user.model')
const AUTH = require('../models/auth.model')
const { BadRequestError } = require("../helpers/response/error.response");
const { transporter } = require('../configs/mailer.config');
const generateTemple = require('../helpers/mailer/template.generate');

//////////////////////// 

// code
const register = async ({ email, password, name }) => {

    const saltRounds = 10;
    let session;
    try {
        // check input
        if (!email || !password || !name) {
            throw new BadRequestError('Missing Input');
        }
        //
        session = await mongoose.startSession();
        session.startTransaction();
        // check email
        const existingUser = await USER.findOne({ usr_email: email })
            .select('usr_email _id')
            .lean();
        if (existingUser) throw new BadRequestError('Email already exists');

        // hash and generate token
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const emailToken = jwt.sign(
            { email },
            process.env.EMAIL_TOKEN_SECRET
        );
        // new user
        const newUser = new USER({
            usr_email: email,
            usr_password: hashedPassword,
            usr_name: name,
            email_token: emailToken,
        });
        await newUser.save({ session });
        // usr's auth
        const newAuth = new AUTH({
            usr_id: newUser._id,
            usr_email: email,
            email_token: emailToken,
        });
        await newAuth.save({ session });
        // 
        await session.commitTransaction();

        // Trả về dữ liệu cần thiết
        return {
            user: newUser,
            auth: newAuth,
        };
    } catch (error) {
        if (session) await session.abortTransaction();
        throw new BadRequestError(error.message || 'Registration failed');
    } finally {
        if (session) session.endSession();
    }
};

// login
const login = async ({ email, password }) => {
    //check email
    const validUsr = await USER.findOne({ usr_email: email })
        .select('usr_email usr_password')
        .lean()
    console.log("validUsr:: ", validUsr);
    if (!validUsr) throw new BadRequestError('Email Not Exist')

    // check password
    const isMatch = await bcrypt.compare(password, validUsr.usr_password);
    console.log("isMatch ::", isMatch);
    if (!isMatch) throw new BadRequestError('Wrong Password')

    // check token exist
    const tokenExisting = await AUTH.findOne({ usr_email: validUsr.usr_email }).lean()
    console.log("exist token:: ", tokenExisting);

    // token have not exist
    if (!tokenExisting) {

        const token = jwt.sign({ sub: validUsr._id }, process.env.SERCRET_KEY, { expiresIn: '1h' });


        console.log("new token::: ", token);

        const savedAuth = await AUTH.updateOne({ usr_email: validUsr.usr_email }, { token })
        return savedAuth
    } else {
        return tokenExisting
    }
}

// send mail
const sendMail = async ({ email }) => {

    const validUsr = await AUTH.findOne(
        { usr_email: email },
        { usr_email: true, _id: true }
    ).lean()

    if (!validUsr.usr_email)
        throw new BadRequestError('Invalid Email')

    await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: validUsr.usr_email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: generateTemple(validUsr.email_token, validUsr.usr_email), // html body
    }, (err, info) => {
        if (err) {
            throw new Error(err)
        } else {
            return info
        }
    });
}

// verify email
const verifyEmail = async ({ email, token }) => {

    const validUsr = await AUTH.findOne({ usr_email: email }).select('usr_email email_token').lean()
    if (!validUsr.usr_email)
        throw new BadRequestError('Invalid Email')

    const decode = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET);

    if (decode) {
        await USER.findOneAndUpdate(
            { usr_email: decode.usr_email },
            {
                verify_token: '',
                verify_token: 'DONE'
            },
            { new: true }
        ).select('usr_name usr_email email_verify')
    }
}

module.exports = {
    register,
    login,
    sendMail,
    verifyEmail
}
