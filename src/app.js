const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const ordersRouter = require('./routes/orders.routes');
const productsRouter = require('./routes/products.routes');
const httpStatusText = require('./utils/httpStatusText');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/session', userRouter);
app.use('/store/products', productsRouter);
app.use('/orders', ordersRouter);

app.use((req, res, next) => {
  res.status(404).json({ status: httpStatusText.ERROR, message: 'NOT FOUND' });
});

app.get('/', (req, res) => {
  res.send('hello world');
  console.log('hello world');
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || "Internal server error",
    code: err.statusCode,
    data: null
  });
});

module.exports = app;
