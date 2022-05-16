const express = require('express')
const path = require("path")
const adminPageController = require(path.resolve("./controllers/admin_page_controller"))
const isAuth = require(path.resolve("./auth/auth"))
const router = express.Router();

router
    .route('/')
    .get(isAuth, adminPageController.create_get)
    .post(isAuth, adminPageController.create_post)
router
    .route('/read')
    .get(isAuth, adminPageController.read_get)
router
    .route('/find')
    .get(isAuth, adminPageController.find_get)
    .post(isAuth, adminPageController.muissa)
router
    .route('/update')
    .get(isAuth, adminPageController.update_get)
    .post(isAuth, adminPageController.update_patch)
router
    .route('/delete')
    .get(isAuth, adminPageController.delete_get)
    .post(isAuth, adminPageController.delete_post)
module.exports = router