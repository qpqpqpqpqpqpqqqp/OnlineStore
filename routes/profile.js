const express = require("express")
const path = require('path')
const isAuth = require(path.resolve("./auth/auth"))
const profileController = require(path.resolve("./controllers/profile_controller"))
const router = express.Router()

router
    .route('/')
    .get(isAuth,profileController.profile_get)
router
    .route('/edit')
    .get(isAuth,profileController.edit_get)
    .post(isAuth,profileController.edit_post)

module.exports = router;