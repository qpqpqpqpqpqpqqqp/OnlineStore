const express = require("express")
const path = require('path')
const isAuth = require(path.resolve("./auth/auth"))
const profileController = require(path.resolve("./controllers/profile_controller"))
const router = express.Router()
// const https = require("https");
router
    .route('/')
    .get(isAuth,profileController.profile_get)
module.exports = router;