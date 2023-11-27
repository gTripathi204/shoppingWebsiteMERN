var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  name:"Gaurav",
  service: "gmail",
  host:"smtp.gmail.com" ,
  port : 465 , 
  secure : true ,
  auth: {
    user: "gshandilya204@gmail.com",
    pass: "xzro jyxa kedf rdqr",
  },
});
const otpSender = (otp,email) => {

  var mailOptions = {
    from: "gshandilya204@gmail.com",
    to: email,
    subject: "Verify OTP for ShoppingApp",
    text: `The OTP to verify your password is ${otp}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = otpSender;
