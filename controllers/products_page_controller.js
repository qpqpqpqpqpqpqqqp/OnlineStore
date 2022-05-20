const Product = require('../models/product')
const path = require("path")
const https = require("https");

// *******************************************************************************************************

exports.clothes_get = async (req, res) => {
    const exchange = req.session.exchange;
    const currency = req.session.currency;
    const products = await Product.find({type: 'clothes'})
    res.render(path.resolve('./public/html_files/clothes.ejs'), {
        ans: exchange != null ? exchange : 1,
        holder: currency != null ? currency : 'USD',
        prod: products
    });
};

exports.clothes_post = async (req, res) => {
    let to = req.body.currency;
    let key = '39FBE301-1E2D-4502-9052-6BC86BB70AC8';
    let url = `https://rest.coinapi.io/v1/exchangerate/USD/${to}?apikey=${key}`
    try {
        https.get(url, function (response) {
            response.on('data', d => {
                let data = JSON.parse(d);
                req.session.exchange = data.rate;
                req.session.currency = to;
                res.redirect('/cloth')
            })
        });
    } catch (e) {
        console.log("error!")
        res.send("Sorry, unexpected error happened. We're working on it!")
    }
};

// *******************************************************************************************************

exports.shoes_get = async (req, res) => {
    const exchange = req.session.exchange;
    const currency = req.session.currency;
    const products = await Product.find({type: 'shoes'})
    res.render(path.resolve('./public/html_files/shoe.ejs'), {
        ans: exchange != null ? exchange : 1,
        holder: currency != null ? currency : 'USD',
        prod: products
    });
};

exports.shoes_post = async (req, res) => {
    let to = req.body.currency;
    let key = '39FBE301-1E2D-4502-9052-6BC86BB70AC8';
    let url = `https://rest.coinapi.io/v1/exchangerate/USD/${to}?apikey=${key}`
    try {
        https.get(url, function (response) {
            response.on('data', d => {
                let data = JSON.parse(d);
                req.session.exchange = data.rate;
                req.session.currency = to;
                res.redirect('/shoes')
            })
        });
    } catch (e) {
        console.log("error!")
        res.send("Sorry, unexpected error happened. We're working on it!")
    }
};

// *******************************************************************************************************

exports.acc_get = async (req, res) => {
    const exchange = req.session.exchange;
    const currency = req.session.currency;
    const products = await Product.find({type: 'accessory'})
    res.render(path.resolve('./public/html_files/access.ejs'), {
        ans: exchange != null ? exchange : 1,
        holder: currency != null ? currency : 'USD',
        prod: products
    });
};

exports.acc_post = async (req, res) => {
    let to = req.body.currency;
    let key = '39FBE301-1E2D-4502-9052-6BC86BB70AC8';
    let url = `https://rest.coinapi.io/v1/exchangerate/USD/${to}?apikey=${key}`
    try {
        https.get(url, function (response) {
            response.on('data', d => {
                let data = JSON.parse(d);
                req.session.exchange = data.rate;
                req.session.currency = to;
                res.redirect('/accessories')
            })
        });
    } catch (e) {
        console.log("error!")
        res.send("Sorry, unexpected error happened. We're working on it!")
    }
};

// *******************************************************************************************************
