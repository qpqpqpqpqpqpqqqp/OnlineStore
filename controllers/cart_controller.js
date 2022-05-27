const Product = require('../models/product')
const Cart = require('../models/orderHistory')
const path = require("path")

exports.cart_get = async (req, res) => {
    // const username = req.session.username
    // const email = req.session.email
    // const phone = req.session.phone
    // const city = req.session.city
    // const postIndex = req.session.postIndex

    res.render(path.resolve('public/front/cart.ejs'), {
        // name: username,
        // phone: phone,
        // email: email,
        // city: city,
        // pIndex: postIndex
    })
};

exports.cart_post = async (req, res) => {
    const {product} = req.query;
    res.send(`sorry we don't know how to get variable from ejs ${product}`)
};