const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const productsController = require('../controllers/products.controller');

router
  .route('/')
  .get(productsController.getAllProducts)
  .post(verifyToken, productsController.createProduct);

router
  .route('/:productId')
  .get(verifyToken, productsController.getProduct)
  .patch(verifyToken, productsController.updateProduct)
  .delete(verifyToken, productsController.deleteProduct);

module.exports = router;
