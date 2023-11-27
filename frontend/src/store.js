import { combineReducers, applyMiddleware } from "redux";

import productListSlice from "./reducers/productListReducer";
import productInfoReducer from "./reducers/productInfoReducer";
import cartReducer from "./reducers/cartReducer";
import userRegisterReducer from "./reducers/userRegisterreducer";
import userLoginLogoutReducer from "./reducers/userReducer";
import userDetailsSlice from "./reducers/userAllInfoReducer";
import MyAllOrder from "./reducers/ordersReducers";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
//// Admin Reducers  ....
import adminReducer from "./reducers/adminReducers/adminReducer";
import adminPendingorders from "./reducers/adminReducers/adminAllPendingorder";
import adminAllCompletedOrder from "./reducers/adminReducers/adminAllCompletedOrder";
import adminAllCancelledOrderReducer from "./reducers/adminReducers/adminAllCancelledOrderReducer";
const reducer = {
  productsList: productListSlice,
  productInfo: productInfoReducer,
  cart: cartReducer,
  registration: userRegisterReducer,
  user: userLoginLogoutReducer,
  userdetails: userDetailsSlice,
  myAllOrder: MyAllOrder,
  admin: adminReducer,
  pendingOrders: adminPendingorders,
  completedOrders: adminAllCompletedOrder,
  cancelledOrders: adminAllCancelledOrderReducer,
};

const store = configureStore({
  reducer,
});

export default store;
