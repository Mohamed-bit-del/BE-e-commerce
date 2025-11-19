const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  product_id: {
    type: Number,
    required: true,
    unique: true,
  },
  product_price: {
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
  product_image: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema, 'products');
module.exports = Product;
