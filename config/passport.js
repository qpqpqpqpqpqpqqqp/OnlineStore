const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const Customer = require('../models/consumer');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user
            Customer.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    console.log("cannot find")
                    return done(null, false, { message: 'That email is not registered' });
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        console.log("incorrect pw")
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        Customer.findById(id, function(err, user) {
            done(err, user);
        });
    });
};