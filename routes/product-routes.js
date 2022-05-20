const express = require("express");
const router = express.Router();
const path = require('path');
const productsPageController = require(path.resolve("./controllers/products_page_controller"))

router
    .route('/home')
    .get((req, res) => res.render(path.resolve('public/html_files/home.ejs')))
router
    .route('/cloth')
    .get(productsPageController.clothes_get)
    .post(productsPageController.clothes_post)
router
    .route('/shoes')
    .get(productsPageController.shoes_get)
    .post(productsPageController.shoes_post)
router
    .route('/accessories')
    .get(productsPageController.acc_get)
    .post(productsPageController.acc_post)

module.exports = router;