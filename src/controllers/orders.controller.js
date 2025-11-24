const Order = require('../models/order.modal');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const asyncWrapper = require('../middleware/asyncWrapper');
const AppError = require('../utils/appError');

const getAllOrders = asyncWrapper(async (req, res) => {
  const orders = await Order.find({}, { __v: false });

  const response = orders.map((p) => {
    const obj = p.toObject();
    obj.order_id = obj._id;
    delete obj._id;
    return obj;
  });

  res.status(200).json({ orders: response });
});

const getOrder = asyncWrapper(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId, { __v: false });

  if (!order) throw new AppError('Order not found', 404);

  return res.status(200).send(order);
});

const createOrder = asyncWrapper(async (req, res) => {
  const { user_id, product_id, product_name, product_price, quantity, order_date, order_status } =
    req.body;

  const userExists = await User.findById(user_id);
  if (!userExists) throw new AppError('User not found', 404);

  const productExists = await Product.findById(product_id);
  if (!productExists) throw new AppError('Product not found', 404);

  const orderExists = await Order.findOne({ user_id, product_id });
  if (orderExists) throw new AppError('Order already exists', 400);

  const productPrice = await Product.findById(product_id);
  if (productPrice.product_price !== product_price)
    throw new AppError('Product price does not match', 400);

  const productQuantity = await Product.findById(product_id);
  if (productQuantity.quantity !== quantity)
    throw new AppError('Product quantity does not match', 400);

  const productName = await Product.findById(product_id);
  if (productName.product_name !== product_name)
    throw new AppError('Product name does not match', 400);

  const newOrder = new Order({
    user_id,
    product_id,
    product_name,
    product_price,
    quantity,
    order_date,
    order_status,
  });

  const saveOrder = await newOrder.save();

  const response = saveOrder.toObject();
  response.order_id = response._id;
  delete response._id;

  res.status(201).json({ Order: response });
});

const updateOrder = asyncWrapper(async (req, res) => {
  const { orderId } = req.params;

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { order_status: req.body.order_status },
    { new: true, runValidators: true }
  );
  if (!updatedOrder) throw new AppError('Order not found', 404);

  const response = updatedOrder.toObject();
  response.order_id = response._id;
  delete response._id;
  delete response.__v;

  return res.status(200).send(response);
});

module.exports = {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
};
