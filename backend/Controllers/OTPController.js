const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");
const userModel = require("../models/user") ;

const OTPController = asynchandler(async (req, res) => {
  if(req.headers.authorization){
    console.log("yes") ;
  } else {
    console.log("no")
  }
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    
    let token = req.headers.authorization.split(" ")[1];
    console.log(token) ;
    const decode = jwt.decode(token, process.env.JWT_SECRET_KEY);
    if (decode) {
      const inputOTP = req.body.OTP;
      console.log(inputOTP) ;
      console.log(decode.OTP) ;
      if (inputOTP == decode.OTP) {
        await userModel.create({
          name: decode.name,
          email: decode.email,
          password: decode.password,
        });
        console.log(decode) ;
        res.send("Otp is verified ! You are Successfully registered ");
      } else {
        res.send("Wrong OTP")
      }
    } else {
      throw new Error("Error")
    }
  } else {
    throw new Error("No token found")
  }
});

module.exports = OTPController;
