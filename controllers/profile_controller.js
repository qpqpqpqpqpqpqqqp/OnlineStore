const Admin = require("../models/admin")
const Seller = require("../models/seller");
const Customer = require("../models/consumer");
const path = require("path")
const bcrypt = require("bcryptjs");

exports.profile_get = async (req, res) => {
    const username = req.session.username
    const email = req.session.email
    const isAdmin = req.session.isAdmin
    const isSeller = req.session.isSeller

    if (isAdmin && !isSeller) {
        res.redirect('/admin')
    } else if (!isAdmin && isSeller) {
        res.redirect('/seller/profile')
    } else {
        const phone = req.session.phone
        const city = req.session.city
        const postIndex = req.session.postIndex
        res.render(path.resolve('public/html_files/UserAccount.ejs'), {
            name: username,
            phone: phone,
            email: email,
            city: city,
            pIndex: postIndex
        })
    }
};

exports.edit_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('public/html_files/edit.ejs'), {err: error});
};

exports.edit_post = async (req, res) => {
    // const {username, email, phone, city, postIndex, password} = req.body
    const {phone, city, postIndex} = req.body

    const currUsername = req.session.username

    if (!phone && !city && !postIndex) {
        req.session.error = "Content empty!";
        return res.redirect('/profile/edit');
    }

    // if (!username && !email && !phone && !city && !postIndex && !password) {
    //     req.session.error = "Content empty!";
    //     return res.redirect('/profile/edit');
    // }

    // let prev = await Seller.findOne({currEmail})
    let customer = await Customer.findOne({currUsername})
    const email = customer.email
    const username = customer.username
    const psw = customer.password

    // let admin = await Admin.findOne({currUsername})

    // const hashPsw = await bcrypt.hash(password, 11);
    await Customer.findOneAndUpdate({username: currUsername}, {
        email: email,
        username: username,
        phone,
        city,
        postIndex,
        // password: hashPsw,
        password: psw,
    }).then(data => {
        if (!data) {
            console.log("You do not exist!");
            return res.redirect('/profile/edit');
        } else {
            req.session.username = username
            req.session.email = email
            req.session.phone = phone
            req.session.city = city
            req.session.postIndex = postIndex
            return res.redirect('/profile');
        }
    })
};