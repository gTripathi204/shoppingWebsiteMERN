const react = require("react");
const orderModel = require("../models/orders");
const productModel = require("../models/productsModel");

const orderPlacement = async (req, res) => {
  const userData = await res.locals.userInformation;
  const userAllDetails = req.body.userAllDetails;
  const cartItems = req.body.cartItems;
  const paymentMethod = req.body.paymentMethod;
  const TotalAmout = req.body.TotalAmout;

  const createOrder = await orderModel.create({
    user: userAllDetails._id,
    orderItems: cartItems,
    shippingAddress: {
      address: `${userAllDetails.Address.laneNumber} ${userAllDetails.Address.city} ${userAllDetails.Address.state} ${userAllDetails.Address.country}`,
      city: userAllDetails.Address.city,
      pincode: userAllDetails.Address.pin,
    },
    paymentMode: paymentMethod,
    totalPrice: TotalAmout,
  });
  if (createOrder) {
    for (let i = 0; i < cartItems.length; i++) {
      const productId = cartItems[i]._id;
      const newStock =
        cartItems[i].countInStock - Number(cartItems[i].productQuantity);
      await productModel.findOneAndUpdate(
        { _id: productId },
        { countInStock: newStock }
      );
    }
    res.status(200).send(createOrder);
  } else {
    res.status(401).send("Sorry , can't place order ");
  }
};

const fatchAllOrders = async (req, res) => {
  const userData = await res.locals.userInformation;
  const userId = userData._id.toString();
  const allOrders = await orderModel.find({ user: userId });
  res.send(allOrders);
};

module.exports = { orderPlacement, fatchAllOrders };
