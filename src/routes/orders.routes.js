const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const orderController = require('../controllers/orders.controller');

router.route('/').get(orderController.getAllOrders).post(orderController.createOrder);

router
  .route('/:orderId')
  .get(verifyToken, orderController.getOrder)
  .patch(verifyToken, orderController.updateOrder);
// .delete(verifyToken, orderController.deleteOrder);

module.exports = router;
