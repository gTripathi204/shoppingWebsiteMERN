const express = require("express");
const router = express();
const protect = require("../middleware/authMiddleware") ; 
const {orderPlacement} = require("../Controllers/oderControllers");
const {fatchAllOrders} = require("../Controllers/oderControllers");


router.post("/orderPlacement",protect,orderPlacement) ; 
router.get("/MyOrders",protect,fatchAllOrders) ; 


module.exports = router;
