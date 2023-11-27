const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./config/config");
const productRoute = require("./routes/productRoute");
const { errorHandler } = require("./middleware/errorHandler");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const adminRouter = require("./routes/adminRoutes");


// cors is use to send data to react server fromn this server
app.use(cors());

//middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
var jsonParser = bodyParser.json() ;

// configure the environment file
dotenv.config();

/// starting database
database.connectDB
  .then(() => console.log("Database is connected"))
  .catch((error) => console.log("Database is not connected", error));

// routing
app.get("/", (req, res) => {
  res.send("<h1>The server is running</h1>");
});

app.use("", productRoute);
app.use("" ,userRouter);

app.use("" ,orderRouter);
app.use("" ,adminRouter);

app.all("*", (req, res, next) => {
  const err = new Error(`cant't find the ${req.originalUrl} on the server`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});

app.use(errorHandler);

// server listening
app.listen(process.env.PORT, () => {
  console.log(`The server is running on ${process.env.PORT}`);
});
