const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const orderController = require('../controllers/orders.controller');

router.route('/')
    .get(orderController.getAllOrders)
    .post(orderController.createOrder);

module.exports = router;