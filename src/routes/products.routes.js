const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products.controller');

router.route('/').get(productsController.getAllProducts).post(productsController.addProduct);

router
  .route('/:productId')
  .get(productsController.getProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

module.exports = router;
