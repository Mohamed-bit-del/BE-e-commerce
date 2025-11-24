var jwt = require('jsonwebtoken');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['authorization'];

  if (!authHeader) {
    return next(new appError(err.message, 401, httpStatusText.ERROR));
  }

  const token = authHeader.split(' ')[1];

  try {
    const curentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = curentUser;
    next();
  } catch (err) {
    return next(new appError(err.message, 401, httpStatusText.ERROR));
  }
};

module.exports = verifyToken;
