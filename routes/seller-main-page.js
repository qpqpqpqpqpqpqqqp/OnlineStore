const express = require('express')
const path = require("path")
const sellerPageController = require(path.resolve("./controllers/seller_page_controller"))
const isAuth = require(path.resolve("./auth/auth"))
const router = express.Router();

router
    .route('/create')
    .get(isAuth, sellerPageController.create_get)
    .post(isAuth, sellerPageController.create_post)
router
    .route('/profile')
    .get(isAuth, sellerPageController.read_get)
// router
//     .route('/find')
//     .get(isAuth, sellerPageController.find_get)
//     .post(isAuth, sellerPageController.muissa)
router
    .route('/update')
    .get(isAuth, sellerPageController.update_get)
    .post(isAuth, sellerPageController.update_patch)
router
    .route('/delete') // тут будет список продуктов + инпут для delete
    .get(isAuth, sellerPageController.delete_get)
    .post(isAuth, sellerPageController.delete_post)
module.exports = router