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
    phone: {
        type: String,
        required: true,
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

const seller = new mongoose.model('Seller', schema);

passport.use(seller.createStrategy())
// passport.use(new passportLocalMongoose({
//     usernameField: 'email',
//     passwordField: 'password'
// }, function (username, password, done) {
//     seller.findOne({email: username}, async function (err, user) {
//         if (err) return done(err)
//         if (!user) return done(null, false, {message: 'Invalid email'})
//
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return done(null, false, {message: 'Invalid password'})
//         return done(null, user)
//     });
// }))
passport.serializeUser(seller.serializeUser())
passport.deserializeUser(seller.deserializeUser())
module.exports = seller;