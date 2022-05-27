const Customer = require("../models/consumer");
const path = require("path")
const Product = require("../models/product");
const jwt = require("jsonwebtoken");

exports.profile_get = async (req, res) => {
    const username = req.session.username
    const email = req.session.email
    if (!req.session.token) {
        req.session.error = "Please, authorize"
        return res.redirect("/login")
    }
    let token = jwt.verify(req.session.token, process.env.SECRET_JWT)

    if (token.role === 2) {
        res.redirect('/admin')
    } else if (token.role === 1) {
        res.redirect('/seller/profile')
    } else if (token.role === 0) {
        const phone = req.session.phone
        const city = req.session.city
        const postIndex = req.session.postIndex
        const products = await Product.find({type: 'ashoes'})
        let sum = 0;
        for (let i = 0; i < products.length; i++) {
            sum += Number(products[i].price)
        }
        res.render(path.resolve('public/html_files/UserAccount.ejs'), {
            name: username,
            phone: phone,
            email: email,
            city: city,
            pIndex: postIndex,
            prod: products,
            sum: sum,
        })
    } else {
        req.session.error = "You have to Login first"
        res.redirect("/login")
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

    // let admin = await Admin.findOne({currUsername})

    // const hashPsw = await bcrypt.hash(password, 11);
    await Customer.findOneAndUpdate({username: currUsername}, {
        $set: {
            phone: phone,
            city: city,
            postIndex: postIndex,
        },
    }).then(data => {
        if (!data) {
            console.log("Are you even real?! Congrats you've caught unreachable error");
            return res.redirect('/profile/edit');
        } else {
            req.session.username = customer.username
            req.session.email = customer.email
            req.session.phone = phone
            req.session.city = city
            req.session.postIndex = postIndex
            return res.redirect('/profile');
        }
    })
};