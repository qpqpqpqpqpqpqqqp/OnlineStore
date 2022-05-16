const express = require('express')
const path = require("path")
const loginController = require(path.resolve("./controllers/login_controller"))
const router = express.Router();

router
    .route('/login')
    .get(loginController.login_get)
    .post(loginController.login_post)
router
    .route('/logout')
    .post(loginController.logout_post)
router
    .route('/register')
    .get(loginController.register_get)
    .post(loginController.register_post)
module.exports = router