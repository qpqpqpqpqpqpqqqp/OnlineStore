const express = require('express')
const path = require("path")
const sellerPageController = require(path.resolve("./controllers/seller_page_controller"))
const isSeller = require(path.resolve("./auth/sellerAuth"))
const router = express.Router();

router
    .route('/create')
    .get(isSeller, sellerPageController.create_get)
    .post(isSeller, sellerPageController.create_post)
router
    .route('/profile')
    .get(isSeller, sellerPageController.read_get)
// router
//     .route('/find')
//     .get(isAuth, sellerPageController.find_get)
//     .post(isAuth, sellerPageController.muissa)
router
    .route('/update')
    .get(isSeller, sellerPageController.update_get)
    .patch(isSeller, sellerPageController.update_patch)
router
    .route('/delete') // тут будет список продуктов + инпут для delete
    .get(isSeller, sellerPageController.delete_get)
    .delete(isSeller, sellerPageController.delete_post)
module.exports = router