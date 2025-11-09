const mongoose = require('mongoose');
const userRoles = require('../utils/user');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRoles.ADMIN, userRoles.USER],
    default: userRoles.USER,
  },
});

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
