const express = require("express");
const router = express.Router();
const path = require('path');
const isAuth = require(path.resolve("./auth/auth"))
const cartController = require(path.resolve("./controllers/cart_controller"))

router
    .route('/')
    .get(isAuth, cartController.cart_get)
    .post(isAuth, cartController.cart_post)

module.exports = router;