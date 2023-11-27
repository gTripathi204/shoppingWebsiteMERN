const jwt = require("jsonwebtoken");
const userModle = require("../models/user");
const asynchandler = require("express-async-handler");

const adminProtect = asynchandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    let token = req.headers.authorization.split(" ")[1];
    const decode = jwt.decode(token, process.env.JWT_SECRET_KEY);
    if (decode) {
      const id = decode._id;
      const data = await userModle.findOne({ _id: id }).select("-password");
      if (data.isAdmin === true) {
        res.locals.userInformation = data;
        next();
      } else {
        throw new Error("No user Found for the given token ");
      }
    } else {
      throw new Error("Invalid Token ");
    }
  } else {
    throw new Error("No token found");
  }
});

module.exports = adminProtect;
