const express = require("express");
const router = express();
const { updateUserprofile, signupControl ,loginControl , getUserProfile } = require("../Controllers/userController");
const bodyParser = require("body-parser");
const protect = require("../middleware/authMiddleware") ; 
const otpController = require("../Controllers/OTPController")


router.post("/register", bodyParser.json(), signupControl);
router.post("/login", bodyParser.json(), loginControl);
router.get("/userProfile" ,protect, getUserProfile) ;
router.post("/verifyOTP" , otpController)
router.post("/userInfoUpdate" ,protect , updateUserprofile) ;

module.exports = router;
