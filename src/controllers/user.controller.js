const User = require('../models/user.model');
const asyncWrapper = require('../middleware/asyncWrapper');
const bcrypt = require('bcrypt');
const generateJWT = require('../utils/generate.jwt');
const httpStatusText = require('../utils/httpStatusText');

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({}, { __v: false, "password": false });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } });
});

const register = asyncWrapper(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await new User({
    name,
    email,
    password: hashedPassword,
    role
  });

  const token = await generateJWT({ id: newUser._id, email: newUser.email, role: newUser.role });
  newUser.token = token;

  await newUser.save();
  res.status(201).json({ status: httpStatusText.SUCCESS, data: newUser });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password) {
    const error = appError.create('Email and Password Are Required', 400, httpStatusText.FAIL);
    return next(error);
  }

  const user = await User.findOne({ email });

  if (!user) {
    const error = appError.create('User Not Found', 400, httpStatusText.FAIL);
    return next(error);
  }

  const matchPssword = await bcrypt.compare(password, user.password);

  if (user && matchPssword) {
    const token = await generateJWT({ id: user._id, email: user.email, role: user.role });
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { name: user.name, role: user.role, email, token } });
  } else {
    const error = appError.create('Something Wrong', 500, httpStatusText.ERROR);
    return next(error);
  }
})

module.exports = {
  getAllUsers,
  register,
  login
};
