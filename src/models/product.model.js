const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  price: Number,
  color: String,
  category: String,
  product_name: String,
});

const Product = mongoose.model('Product', productSchema, 'products');
module.exports = Product;
