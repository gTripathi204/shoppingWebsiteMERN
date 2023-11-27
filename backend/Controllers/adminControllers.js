const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwtToken = require("jsonwebtoken");
const { generateTokenFun } = require("../utilities/generateToken");
const asyncHandler = require("express-async-handler");
const orderModel = require("../models/orders");
const productModal = require("../models/productsModel");

const adminLogin = asyncHandler(async (req, res) => {
  const id = req.body.email;
  const password = req.body.password;
  const adminFound = await userModel.findOne({ email: id });

  if (adminFound) {
    if (adminFound.isAdmin === true) {
      const checkPassword = await bcrypt.compare(password, adminFound.password);
      if (checkPassword) {
        res.send({
          Token: generateTokenFun({
            _id: adminFound._id,
          }),
          message: "You logged in Successfully",
        });
      } else {
        throw new Error("wrong password");
      }
    } else {
      throw new Error("The given id is Not a Admin");
    }
  } else {
    throw new Error("No Email Id Found");
  }
});

const updateProductStatus = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updatedStatus = req.body.updatedStatus;
  const response = await orderModel.findOneAndUpdate(
    { _id: id },
    { deliveryStatus: updatedStatus }
  );

  if (response) {
    res.send("The product successfully updated");
  } else {
    throw new Error("Updation failed");
  }
});

const pendingProducts = asyncHandler(async (req, res) => {
  const admin = res.locals.userInformation;
  const allpendinOrders = await orderModel.find({
    deliveryStatus: { $nin: ["Delivered", "Cancelled"] },
  });
  if (allpendinOrders) {
    res.send(allpendinOrders);
  } else {
    throw new Error("Database is unable to fatch data");
  }
});

const allConpletedOrders = asyncHandler(async (req, res) => {
  const admin = res.locals.userInformation;
  const allcompletedorders = await orderModel.find({
    deliveryStatus: "Delivered",
  });
  if (allcompletedorders) {
    res.send(allcompletedorders);
  } else {
    throw new Error("Database is unable to fatch data");
  }
});

const allCancelledOrder = asyncHandler(async (req, res) => {
  const admin = res.locals.userInformation;
  const allCancelledOrder = await orderModel.find({
    deliveryStatus: "Cancelled",
  });
  if (allCancelledOrder) {
    res.send(allCancelledOrder);
  } else {
    throw new Error("Database is unable to fatch data");
  }
});

const addProduct = asyncHandler(async (req, res) => {
  const image = req.file.path;
  const productName = req.body.productName;
  const productDescription = req.body.productDescription;
  const productBrand = req.body.productBrand;
  const productCatagory = req.body.productCatagory;
  const productPrice = req.body.productPrice;
  const productDiscount = req.body.productDiscount;
  const productCountInStock = req.body.productCountInStock;
  const productImage = image.slice(15);
  
  const data = new productModal({
    name: productName,
    image: productImage,
    description: productDescription,
    brand: productBrand,
    catagory: productCatagory,
    price: productPrice,
    discont: productDiscount,
    countInStock: productCountInStock,
  });
   
  data.save().then((data) => {
    console.log("Product saved Successfully")
    res.send(data)
  }).catch((err) => {
     res.status(401);
     res.send("Sorry")
  });

});

module.exports = {
  adminLogin,
  updateProductStatus,
  pendingProducts,
  allConpletedOrders,
  allCancelledOrder,
  addProduct,
};
