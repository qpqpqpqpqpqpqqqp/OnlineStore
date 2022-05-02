const express = require('express')
const UserController = require('../controllers/User')
const router = express.Router();
router
    .route('/')
    .get(UserController.findAll)
    .post(UserController.create)
    .delete(UserController.destroy);
router
    .route('/:id')
    .get(UserController.findOne)
    .patch(UserController.update)
module.exports = router