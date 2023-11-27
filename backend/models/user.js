/// Schema define

const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("The email format is wrong");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    phoneNumber: {
      type: String,
      default: "+91",
    },
    Address: {
      laneNumber: String,
      city: String,
      state : String,
      pin: {
        type: String,
        max: 20,
      },
      country: {
        type: String,
        default: "India",
      },
    },
  },
  { timestamps: true }
);

const userInfo = mongoose.model("userInfo", userSchema);

module.exports = userInfo;
