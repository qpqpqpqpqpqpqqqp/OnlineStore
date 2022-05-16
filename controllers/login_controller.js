const bcrypt = require("bcryptjs")
const Admin = require("../models/admin")
const Seller = require("../models/seller");
const Customer = require("../models/consumer");
const path = require("path");

exports.login_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./front/login.ejs'), { err: error });
};

exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email })
    const seller = await Seller.findOne({ email })
    const customer = await Customer.findOne({ email })

    if (!admin && !seller && !customer) {
        req.session.error = "Invalid email";
        return res.redirect('/login');
    }

    const user = (admin ? admin: seller ? seller: customer)

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        req.session.error = "Invalid password";
        return res.redirect('/login');
    }

    req.session.isAuth = true;
    req.session.username = user.username
    req.session.email = user.email

    if (admin) {
        req.session.isAdmin = true
        req.session.isSeller = false
        res.redirect('/admin')
    }
    else if (seller) {
        req.session.isAdmin = false
        req.session.isSeller = true
        req.session.phone = seller.phone
        res.redirect('/seller')
    }
    else if (customer) {
        req.session.isAdmin = false
        req.session.isSeller = false
        req.session.phone = customer.phone
        req.session.city = customer.city
        req.session.postIndex = customer.postIndex
        res.redirect('/profile')
    }
};

exports.register_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./front/register.ejs'), { err: error });
};

exports.register_post = async (req, res) => {
    const { username, email, phone, city, postIndex, password } = req.body

    if (!username && !email && !phone && !city && !postIndex && !password) {
        req.session.error = "Content empty!";
        return res.redirect('/register');
    }

    let seller = await Seller.findOne({email})
    let customer = await Customer.findOne({email})
    let admin = await Admin.findOne({ email })

    if (seller || customer || admin) {
        req.session.error = "Email taken!";
        return res.redirect('/register');
    }

    seller = await Seller.findOne({username})
    customer = await Customer.findOne({username})
    admin = await Admin.findOne({ username })
    if (seller || customer || admin) {
        req.session.error = "Username taken!";
        return res.redirect('/register');
    }

    const hashPsw = await bcrypt.hash(password, 11);

    customer = new Customer({
        username,
        email,
        phone,
        city,
        postIndex,
        password: hashPsw,
    });

    await customer.save();
    req.session.isAuth = true;
    req.session.username = username;
    res.redirect('/home')
};

exports.logout_post = async (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/login');
    });
};