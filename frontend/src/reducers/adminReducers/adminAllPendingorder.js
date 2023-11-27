import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminAllPlendingOrders: [],
};

const AllPendingOrdersReducer = createSlice({
  name: "addPendingorders",
  initialState,
  reducers: {
    addAllPendingOrders: (state, action) => {
      state.adminAllPlendingOrders = (action.payload);
    },
  },
});

export const { addAllPendingOrders } = AllPendingOrdersReducer.actions;

export default AllPendingOrdersReducer.reducer;
