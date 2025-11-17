const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  price: {
    type: Number,
    required: true,
    unique: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema, 'products');
module.exports = Product;
