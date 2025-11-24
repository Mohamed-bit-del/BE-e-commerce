const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    product_price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    // product_image: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret.id;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret.id;
      },
    },
  }
);

productSchema.virtual('product_id').get(function () {
  return this._id;
});

const Product = mongoose.model('Product', productSchema, 'products');
module.exports = Product;
