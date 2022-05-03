const express = require('express')
const UserController = require('../controllers/User')
const path = require("path");
const router = express.Router();
router
    .route('/')
    .get((req, res) => {res.render(path.resolve('public/html_files/register.ejs'))})
    // .get(UserController.findAll)
    .post(UserController.create)
    .delete(UserController.destroy)
router
    .route('/:id')
    .get(UserController.findOne)
    .patch(UserController.update)
    .delete(UserController.destroy);
module.exports = router