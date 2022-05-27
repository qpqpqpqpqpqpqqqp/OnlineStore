const express = require("express")
const path = require('path')
const profileController = require(path.resolve("./controllers/profile_controller"))
const router = express.Router()

router
    .route('/')
    .get(profileController.profile_get)
router
    .route('/edit')
    .get(profileController.edit_get)
    .post(profileController.edit_post)

module.exports = router;