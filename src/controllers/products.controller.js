const Product = require('../models/product.model');
const User = require('../models/user.model');
const asyncWrapper = require('../middleware/asyncWrapper');
const AppError = require('../utils/appError');

const getAllProducts = async (req, res) => {
  const products = await Product.find({}, { __v: false });

  const response = products.map((p) => {
    const obj = p.toObject();
    obj.product_id = obj._id;
    delete obj._id;
    return obj;
  });

  res.status(200).send(response);
};

const getProduct = asyncWrapper(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId, { __v: false });

  if (!product) throw new AppError('Product not found', 404);

  const response = product.toObject();
  response.product_id = response._id;
  delete response._id;

  return res.status(200).send(response);
});

const createProduct = asyncWrapper(async (req, res) => {
  const { userId, product_price, product_name, quantity, category } = req.body;

  if (!userId) throw new AppError('userId is required', 400);

  const userExists = await User.findById(userId);
  if (!userExists) throw new AppError('User not found', 400);

  // Validate price
  if (!product_price || isNaN(product_price)) throw new AppError('Invalid product price', 400);

  const newProduct = new Product({
    product_price,
    quantity,
    category,
    product_name,
  });

  const savedProduct = await newProduct.save();

  const response = savedProduct.toObject();
  response.product_id = savedProduct._id;
  delete response.__v;
  delete response._id;

  res.status(201).send(response);
});

const updateProduct = async (req, res) => {
  const { productId } = req.params;

  const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
  if (!updatedProduct) throw new AppError('Product not found', 404);

  const response = updatedProduct.toObject();
  response.product_id = response._id;
  delete response._id;
  delete response.__v;

  return res.status(200).send(response);
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  await Product.deleteOne({ _id: productId });
  return res.status(200).json({ data: null });
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
