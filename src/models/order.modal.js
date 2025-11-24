const mongoose = require('mongoose');
const orderRoles = require('../utils/order');

const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
      unique: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    order_status: {
      type: String,
      enum: [orderRoles.PENDING, orderRoles.DELIVERED, orderRoles.APROVED, orderRoles.CANCELLED],
      default: orderRoles.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema, 'orders');
module.exports = Order;
