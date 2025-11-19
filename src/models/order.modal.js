const mongoose = require('mongoose');
const orderRoles = require('../utils/order');

const orderSchema = mongoose.Schema({
    // order_id: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    // },
    // product_id: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    // },
    // user_id: {
    //     type: Number,
    //     required: true,
    //     required: true,
    // },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    product_name: {
        type: String,
        required: true,
    },
    product_price: {
        type: Number,
        required: true,
    },
    order_date: {
        type: Date,
        required: true,
    },
    order_status: {
        type: String,
        enum: [orderRoles.PENDING, orderRoles.DELIVERED, orderRoles.APROVED, orderRoles.CANCELLED],
        default: orderRoles.PENDING,
    },
},
{
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema, 'orders');
module.exports = Order;