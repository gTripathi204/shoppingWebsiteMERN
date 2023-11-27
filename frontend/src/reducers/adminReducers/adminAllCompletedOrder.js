import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminAllCompletedOrders: [],
  adminAllCompletedOrdersLoadingStatus: false,
};

const adminAllCompletedOrders = createSlice({
  name: "addCompletedorders",
  initialState,
  reducers: {
    addAllCompletedOrders: (state, action) => {
      state.adminAllCompletedOrders = action.payload;
    },
    addAllCompletedOrdersLoader: (state, action) => {
      state.adminAllCompletedOrdersLoadingStatus = action.payload;
    },
  },
});

export const { addAllCompletedOrders, addAllCompletedOrdersLoader } =
  adminAllCompletedOrders.actions;

export default adminAllCompletedOrders.reducer;
