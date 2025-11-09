const User = require('../models/user.model');
const asyncWrapper = require('../middleware/asyncWrapper');
const bcrypt = require('bcrypt');
const generateJWT = require('../utils/generate.jwt');
const httpStatusText = require('../utils/httpStatusText');

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({}, { __v: false });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: users });
});

const register = asyncWrapper(async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = await generateJWT({ id: newUser._id, email: newUser.email, role: newUser.role });
  newUser.token = token;

  await newUser.save();
  res.status(201).json({ status: httpStatusText.SUCCESS, data: newUser });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
})

module.exports = {
  getAllUsers,
  register,
};
