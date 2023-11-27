const userModel = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const soltRounds = process.env.SOLT_ROUNDS;
const { generateTokenFun } = require("../utilities/generateToken");
const otpSender = require("./OTPSender");

function createOTP() {
  let otp = Math.floor(Math.random() * 1000000);
  return otp;
}

const signupControl = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const checkmail = await userModel.findOne({ email: email });
  if (checkmail) {
    res.send("User already registered");
    return;
  }
  const password = req.body.password;
  const rePassword = req.body.rePassword;
  const genSalt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, genSalt);
  const isSame = await bcrypt.compare(rePassword, passwordHash);
  if (isSame) {
    const OTP = createOTP();
    await otpSender(OTP, email);
    const token = await generateTokenFun({
      name: name,
      email: email,
      password: passwordHash,
      OTP: OTP,
    });
    res.send({
      message: "you are registered , go to verify your OTP",
      token: token,
    });
  } else {
    res.send({ err: "Something went wrong" });
  }
});

const loginControl = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const checkEmail = await userModel.findOne({ email: email });

  if (checkEmail) {
    if (checkEmail.isAdmin === false) {
      const savedPassword = checkEmail.password;
      const checkPassValidation = await bcrypt.compare(password, savedPassword);
      if (checkPassValidation) {
        res.send({
          _id: checkEmail._id,
          name: checkEmail.name,
          isAdmin: checkEmail.isAdmin,
          Token: generateTokenFun({
            _id: checkEmail._id,
          }),
          message: "You logged in Successfully",
        });
      } else {
        throw new Error("Wrong password");
      }
    } else {
      throw new Error("This Email is Belongs to Admin");
    }
  } else {
    throw new Error("Email Id not found password");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const data = await res.locals.userInformation;
  const allInfo = await userModel.findOne({ _id: data.id });
  res.send(allInfo);
});

const updateUserprofile = asyncHandler(async (req, res) => {
  const userData = await res.locals.userInformation;
  const userInfoFromDB = await userModel.findOne(userData._id);
  const laneNumber = req.body.laneNumber;
  const city = req.body.city;
  const state = req.body.state;
  const pin = req.body.pin;
  const country = req.body.country;
  const phoneNumber = req.body.phoneNumber;

  const crt = await userModel.findOneAndUpdate(
    { _id: userInfoFromDB._id },
    {
      phoneNumber: phoneNumber || userInfoFromDB.phoneNumber,
      Address: {
        laneNumber: laneNumber || userInfoFromDB.Address.laneNumber,
        city: city || userInfoFromDB.Address.city,
        state: state || userInfoFromDB.Address.state,
        pin: pin || userInfoFromDB.Address.pin,
        country: country || userInfoFromDB.Address.country,
      },
    }
  );
  res.send(crt);
});

module.exports = {
  signupControl,
  loginControl,
  getUserProfile,
  updateUserprofile,
};
