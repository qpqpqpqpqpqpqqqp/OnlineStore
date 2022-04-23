const express = require("express");
const router = express.Router();
const path = require('path');
const https = require("https");
//something to do
const port = 3000;
router
    .route('/')
    .get((req, res) => res.render(path.resolve('public/html_files/shoe.ejs'), {ans: 1, holder: 'USD'}))
    .post((req, res) => {
        let to = req.body.currency;
        let key = '39FBE301-1E2D-4502-9052-6BC86BB70AC8';
        let url = `https://rest.coinapi.io/v1/exchangerate/USD/${to}?apikey=${key}`
        try {
            https.get(url, function (response) {
                response.on('data', d => {
                    let data = JSON.parse(d);
                    let curr = data.rate;
                    res.render(path.resolve('public/html_files/shoe.ejs'), {ans: curr, holder: to});
                })
            });
        } catch (e) {
            console.log("error!")
            res.send("Sorry, unexpected error happened. We're working on it!")
        }
    })
module.exports = router;