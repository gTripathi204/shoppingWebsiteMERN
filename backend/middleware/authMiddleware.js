const jwt = require("jsonwebtoken");
const userModle = require("../models/user");
const asynchandler = require("express-async-handler");

const protect = asynchandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    let token = req.headers.authorization.split(" ")[1];
    const decode = jwt.decode(token, process.env.JWT_SECRET_KEY);
    if (decode) {
      const id = decode._id;
      const data = await userModle.findOne({ _id: id }).select("-password");
      if (data) {
         res.locals.userInformation = data  ;     
       next();
      } else {
        res.send("No user Found for the given token ");
      }
    } else {
      res.status(401);
      res.send("Invalid Token ");
    }
  } else {
    res.status(401);
    res.json("No token found");
    // throw new Error("Token nort found") ;
  }
});

module.exports = protect;
