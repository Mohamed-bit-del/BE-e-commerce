const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const userController = require('../controllers/user.controller');

router.route('/').get(verifyToken, userController.getAllUsers);

router.route('/register').post(userController.register);

module.exports = router;
