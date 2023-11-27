import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminAllCancelledOrders: [],
  adminAllCancelledOrdersLoadingStatus: false,
};

const adminAllCancelledOrders = createSlice({
  name: "addCancelledorders",
  initialState,
  reducers: {
    addAllCancelledOrders: (state, action) => {
      state.adminAllCancelledOrders = action.payload;
    },
    addAllCancelledOrdersLoader: (state, action) => {
      state.adminAllCancelledOrdersLoadingStatus = action.payload;
    },
  },
});

export const { addAllCancelledOrders , addAllCancelledOrdersLoader } =
  adminAllCancelledOrders.actions;

export default adminAllCancelledOrders.reducer;
