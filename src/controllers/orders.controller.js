const Order = require('../models/order.modal');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const asyncWrapper = require('../middleware/asyncWrapper');

const getAllOrders = asyncWrapper(async (req, res) => {
    const orders = await Order.find({}, { __v: false, _id: false });
    res.status(200).json({ orders: orders })
});

const createOrder = asyncWrapper(async (req, res) => {
    console.log('📨 Request Body:', req.body);

    const orderId = 1;
    const { order_id, userId, product_id, quantity, product_name, product_price, order_date, order_status } = req.body;

    const userExists = User.findById(userId);
    if (!userExists) {
        return res.status(404).send({ message: 'User not found' });
    }

    const productExists = await Product.findById(product_id);
    if (!productExists) {
        return res.status(404).send({ message: 'Product not found' });
    };

    const newOrder = new Order({
        order_id: order_id,
        user_id: userId,
        product_id: product_id,
        quantity: quantity,
        product_name: product_name,
        product_price: product_price,
        order_date: order_date,
        order_status: order_status
    });

    // const newOrder = new Order(req.body);
    const saveOrder = await newOrder.save();
    res.status(201).json({ saveOrder: saveOrder });
});

module.exports = {
    getAllOrders,
    createOrder
}