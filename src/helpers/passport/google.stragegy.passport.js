const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()

const GOOGLE = require('../../models/google.model')

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/api/v1/access/google/callback",
            passReqToCallback: true
        },
        function (accessToken, refreshToken, profile, done) {
            if (profile) {
                GOOGLE.findOne({ google_id: profile.id })
                    .then((existingUser) => {
                        if (existingUser) {
                            done(null, existingUser);
                        } else {
                            new googleSchema({
                                google_id: profile.id,
                                usr_email: profile.emails[0].value,
                                usr_name: profile.name.familyName + ' ' + profile.name.givenName,
                                accessToken: accessToken,
                                refreshToken: refreshToken
                            })
                                .save()
                                .then(user => done(null, user));
                        }
                    })
            }
        },


        // (profile, done) => {

        // Check if google profile exist.
        // if (profile.id) {

        //     GOOGLE.findOne({ googleId: profile.id })
        //         .then((existingUser) => {
        //             if (existingUser) {
        //                 done(null, existingUser);
        //             } else {
        //                 new googleSchema({
        //                     google_id: profile.id,
        //                     usr_email: profile.emails[0].value,
        //                     usr_name: profile.name.familyName + ' ' + profile.name.givenName
        //                 })
        //                     .save()
        //                     .then(user => done(null, user));
        //             }
        //         })
        // }
        // }
    ));