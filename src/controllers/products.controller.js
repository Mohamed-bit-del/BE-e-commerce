const Product = require('../models/product.model');
const asyncWrapper = require('../middleware/asyncWrapper');

const getAllProducts = async (req, res) => {
  const products = await Product.find({}, { __v: false });
  res.status(200).send(products);
  // res.status(500).send({ message: 'Error retrieving products' });
};

const getProduct = asyncWrapper(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId, { __v: false });
  if (!product) {
    return res.status(404).send({ message: 'Product not found' });
  }
  return res.status(200).send(product);
  // return res.status(500).send({ message: 'Error updating product' }, err);
});

const addProduct = asyncWrapper(async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.status(201).send(savedProduct);

  // res.status(500).send({ message: 'Error creating product' });
});

const updateProduct = async (req, res) => {
  const { productId } = req.params;

  const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
  return res.status(200).send(updatedProduct);
  // return res.status(500).send({ message: 'Error updating product' }, err);
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  await Product.deleteOne({ _id: productId });
  return res.status(200).json({ data: null });
  // return res.status(500).send({ message: 'Error deleting product' }, err);
};

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
