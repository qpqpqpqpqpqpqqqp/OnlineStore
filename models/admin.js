const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')
const passport = require('passport')
const bcrypt = require("bcryptjs");
let schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    special: {
        type: Number,
        required: true,
    }
});
schema.plugin(passportLocalMongoose)

const admin = new mongoose.model('Admin', schema);

passport.use(admin.createStrategy())
// passport.use(new passportLocalMongoose({
//     usernameField: 'email',
//     passwordField: 'password'
// }, function (username, password, done) {
//     admin.findOne({email: username}, async function (err, user) {
//         if (err) return done(err)
//         if (!user) return done(null, false, {message: 'Invalid email'})
//
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return done(null, false, {message: 'Invalid password'})
//         return done(null, user)
//     });
// }))
passport.serializeUser(admin.serializeUser())
passport.deserializeUser(admin.deserializeUser())
module.exports = admin;