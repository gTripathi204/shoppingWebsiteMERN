const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserModel",
    },
    orderItems: [
      {
        name: String,
        productQuantity: Number,
        image: String,
        price: Number,
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
    },
    paymentMode: {
      type: String,
      required: true,
    },
    PaymentResult: {
      id: { type: String },
      status: String,
      updateTime: String,
      email_address: String,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingprice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    deliveryStatus: {
      type: String,
      default: "Order Placed",
    },

    deliveredAt: Date,
  },
  { timestamps: true }
);

const orderModel = mongoose.model("orderModel", orderSchema);

module.exports = orderModel;
