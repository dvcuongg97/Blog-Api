require('dotenv').config()

const passport = require('passport');
const USER = require('../../models/user.model')

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SERCRET_KEY; // Keep this secret!

passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        const { sub } = jwt_payload
        const user = USER.find({ _id: sub });
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    })
);