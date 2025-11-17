const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const productsController = require('../controllers/products.controller');

router
  .route('/')
  .get(productsController.getAllProducts)
  .post(verifyToken, productsController.addProduct);

router
  .route('/:productId')
  .get(productsController.getProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

module.exports = router;
