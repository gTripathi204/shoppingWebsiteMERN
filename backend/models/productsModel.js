const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  catagory: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discont: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  reviews: [reviewSchema],
});

const products = mongoose.model("products", productSchema);

module.exports = products;
