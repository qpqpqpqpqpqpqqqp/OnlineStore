const express = require('express')
const path = require("path")
const adminPageController = require(path.resolve("./controllers/admin_page_controller"))
const isAdmin = require(path.resolve("./auth/adminAuth"))
const router = express.Router();

router
    .route('/')
    .get(isAdmin, adminPageController.create_get)
    .post(isAdmin, adminPageController.create_post)
router
    .route('/read')
    .get(isAdmin, adminPageController.read_get)
router
    .route('/find')
    .get(isAdmin, adminPageController.find_get)
    .post(isAdmin, adminPageController.muissa)
router
    .route('/update')
    .get(isAdmin, adminPageController.update_get)
    .patch(isAdmin, adminPageController.update_patch)
router
    .route('/delete')
    .get(isAdmin, adminPageController.delete_get)
    .delete(isAdmin, adminPageController.delete_post)
module.exports = router