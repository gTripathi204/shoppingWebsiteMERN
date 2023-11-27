const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getSingleProduct,
} = require("../Controllers/productController");



router.get("/products", getAllProducts);

router.get("/products/:id", getSingleProduct);

module.exports = router;
