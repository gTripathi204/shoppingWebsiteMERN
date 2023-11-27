const express = require("express");
const router = express();
const {
  adminLogin,
  pendingProducts,
  updateProductStatus,
  allConpletedOrders,
  allCancelledOrder,
  addProduct,
} = require("../Controllers/adminControllers");
const protect = require("../middleware/adminAuthMiddleware");
const upload = require("../middleware/multerMiddleware")

router.post("/adminLogin", adminLogin);
router.get("/allPendingOrders", protect, pendingProducts);
router.post("/updateDeliveryStatus/:id", protect, updateProductStatus);
router.get("/allCompletedOrders", protect, allConpletedOrders);
router.get("/allCancelledOrders", protect, allCancelledOrder);
router.post("/addProduct", upload.single("productImage"),protect, addProduct);
module.exports = router;
