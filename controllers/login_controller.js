const bcrypt = require("bcryptjs")
const Admin = require("../models/admin")
const Seller = require("../models/seller");
const Customer = require("../models/consumer");
const path = require("path");
const jwt = require("jsonwebtoken")
const passport = require("passport");

const generateToken = (id, role) => {
    const payload = {id, role}
    return jwt.sign(payload, process.env.SECRET_JWT, {expiresIn: "12h"})
}
exports.login_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./public/front/login.ejs'), {err: error});
};

exports.login_post = async (req, res) => {
    const {email, password} = req.body;

    const admin = await Admin.findOne({email})
    const seller = await Seller.findOne({email})
    const customer = await Customer.findOne({email})

    if (!admin && !seller && !customer) {
        req.session.error = "Invalid email";
        return res.redirect('/login');
    }

    const user = (admin ? admin : seller ? seller : customer)

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        req.session.error = "Invalid password";
        return res.redirect('/login');
    }

    // req.login(user, function (err) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         passport.authenticate("local")(req, res, function () {
    //             res.redirect("/")
    //         });
    //     }
    // })

    req.session.token = generateToken(user._id, user.special)

    req.session.username = user.username
    req.session.email = user.email

    if (admin) {
        // passport.authenticate('local', {
        //     successRedirect: '/admin',
        //     failureRedirect: '/login'
        // }, (req, res) => {
        //     console.log('yes')
        // })
        res.redirect('/admin')
    }
    else if (seller) {
        req.session.phone = seller.phone
        // passport.authenticate('local', {
        //     successRedirect: '/seller/profile',
        //     failureRedirect: '/login'
        // })
        res.redirect('/seller/profile')
    }
    else if (customer) {
        req.session.phone = customer.phone
        req.session.city = customer.city
        req.session.postIndex = customer.postIndex
        // passport.authenticate('local', {
        //     successRedirect: '/profile',
        //     failureRedirect: '/login'
        // })
        res.redirect('/profile')
    }
};

exports.register_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./public/front/register.ejs'), {err: error});
};

exports.register_post = async (req, res) => {
    const {username, email, phone, city, postIndex, password} = req.body

    if (!username && !email && !phone && !city && !postIndex && !password) {
        req.session.error = "Content empty!";
        return res.redirect('/register');
    }

    let seller = await Seller.findOne({email})
    let customer = await Customer.findOne({email})
    let admin = await Admin.findOne({email})

    if (seller || customer || admin) {
        req.session.error = "Email taken!";
        return res.redirect('/register');
    }

    seller = await Seller.findOne({username})
    customer = await Customer.findOne({username})
    admin = await Admin.findOne({username})
    if (seller || customer || admin) {
        req.session.error = "Username taken!";
        return res.redirect('/register');
    }

    const hashPsw = await bcrypt.hash(password, 11);

    // Customer.register({
    //     username,
    //     email,
    //     phone,
    //     city,
    //     postIndex,
    //     password: hashPsw,
    // }, hashPsw, function (err, user) {
    //     if (err) {
    //         console.log(err)
    //         res.redirect("/register")
    //     } else {
    //         passport.authenticate("local", {
    //             successRedirect: '/profile',
    //             failureRedirect: '/register'
    //         }, (err, user) => {
    //             if (err) {
    //                 console.log(err)
    //             }
    //             if (!user) {
    //                 console.log("not found")
    //             }
    //             req.session.isAuth = true
    //             req.session.isAdmin = false
    //             req.session.isSeller = false
    //             req.session.username = username
    //             req.session.email = email
    //             req.session.phone = customer.phone
    //             req.session.city = customer.city
    //             req.session.postIndex = customer.postIndex
    //             // res.redirect('/profile')
    //         })
    //     }
    // })
    customer = new Customer({
        username,
        email,
        phone,
        city,
        postIndex,
        password: hashPsw,
        special: 0,
    })

    await customer.save().then(async data => {
        if (!data) {
            req.session.error = "Mongo go brrrrr"
            return res.redirect('/register');
        } else {
            req.session.token = generateToken(data._id, data.special)
            req.session.username = username
            req.session.email = email
            req.session.phone = phone
            req.session.city = city
            req.session.postIndex = postIndex
            return res.redirect('/profile');
        }
    });
};

exports.logout_post = async (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        // req.logout()
        res.redirect('/login');
    });
};

exports.authGoogle = async (req, res) => {
    passport.authenticate('google',{ scope: ["profile"] })
}