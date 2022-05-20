const Product = require('../models/product')
const Cart = require('../models/orderHistory')
const path = require("path")

exports.cart_get = async (req, res) => {
    const username = req.session.username
    const email = req.session.email
    const isAdmin = req.session.isAdmin
    const isSeller = req.session.isSeller

    if (!isAdmin && !isSeller) {
        const phone = req.session.phone
        const city = req.session.city
        const postIndex = req.session.postIndex
        res.render(path.resolve('public/front/cart.ejs'), {
            name: username,
            phone: phone,
            email: email,
            city: city,
            pIndex: postIndex
        })
    } else {
        res.send("your dumb")
    }
};

exports.cart_post = async (req, res) => {
    const {product} = req.query;
    res.send(`sorry we don't know how to get variable from ejs ${product}`)
};