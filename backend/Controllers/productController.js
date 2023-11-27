const productModel = require("../models/productsModel");
const asyncHandler = require("express-async-handler");

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productModel.find();
  res.json(products);
});

const getSingleProduct =  asyncHandler(async (req, res) => {
    const x = req.params.id;
    const product = await productModel.findOne({ _id: x });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json("Product not found");
    }
  });


module.exports = { getAllProducts, getSingleProduct };
