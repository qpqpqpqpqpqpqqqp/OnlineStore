const express = require("express");
const router = express.Router();
const path = require('path');
// const https = require("https");
router
    .route('/')
    .get((req, res) => res.render(path.resolve('public/html_files/UserAccount.ejs'), {name: 'Abd', phone: '8 777 777 77 77', email: 'sdvewgwg@gmail.com', city: 'Berlin', pIndex: 1}))
module.exports = router;