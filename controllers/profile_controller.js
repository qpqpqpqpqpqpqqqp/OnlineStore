const Admin = require("../models/admin")
const Seller = require("../models/seller");
const Customer = require("../models/consumer");
const path = require("path")

exports.profile_get = async (req, res) => {
    const username = req.session.username
    const email = req.session.email
    const isAdmin = req.session.isAdmin
    const isSeller = req.session.isSeller

    if (isAdmin && !isSeller) {
        res.redirect('/admin')
    }
    else if (!isAdmin && isSeller) {
        res.redirect('/seller/read')
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