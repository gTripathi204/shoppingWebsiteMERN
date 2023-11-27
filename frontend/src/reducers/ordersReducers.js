import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myAllOrders: null,
  myAllOrderLoading: "true",
};

export const orderReducer = createSlice({
  name: "MyOrders",
  initialState,
  reducers: {
    addAllOrders: (state, action) => {
      state.myAllOrders = action.payload;
    },
    deleteAddAllOrders: (state, action) => {
      state.myAllOrders = null;
      state.myAllOrderLoading = "true";
    },
    addAllOrdersLoading: (state, action) => {
      state.myAllOrderLoading = action.payload;
    },
  },
});

export const { addAllOrders, addAllOrdersLoading ,deleteAddAllOrders } = orderReducer.actions;

export default orderReducer.reducer;
