const mongoose = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose')
const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')

const bcrypt = require("bcryptjs")
const schema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
        unique: true,
    },
    email: {
        type: String,
        // required: true,
        unique: true,
    },
    phone: {
        type: String,
        // required: true,
    },
    city: {
        type: String,
        // required: true,
    },
    postIndex: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        // required: true,
    },
    special: {
        type: Number,
        required: true,
    },
    googleId: String,
});

schema.plugin(passportLocalMongoose)
schema.plugin(findOrCreate)

const consumer = new mongoose.model('Consumer', schema);

passport.use(consumer.createStrategy())
passport.serializeUser(function (user, done) {
    done(null, user.id)
})
passport.deserializeUser(function (id, done) {
    consumer.findById(id, function (err, user) {
        done(err, user)
    })
})

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/OnlineStore"
    },
    function (accessToken, refreshToken, profile, cb) {
        consumer.findOrCreate({
            googleId: profile.id,
            username: profile.displayName,
            email: '****@****.***',
            city: 'default',
            postIndex: 'default',
            phone: 'default',
            special: 0
            // where: {
            //     googleId: profile.id,
            //     username: profile.displayName,
            //     email: '****@****.***',
            //     city: 'default',
            //     postIndex: 'default',
            //     phone: 'default',
            //     special: 0
            // }

        }, function (err, user) {
            return cb(err, user);
        });
    }
));

//
module.exports = consumer;