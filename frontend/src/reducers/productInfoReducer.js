import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  productInfo: {},
  productInfoLoading: false,
};

export const productInfoSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fatchProductInfoLoading: (state, action) => {
        state.productInfoLoading = action.payload;
    },
    fatchProductInfo: (state = {}, action) => {
      state.productInfo = action.payload;
    },
  },
});

export const { fatchProductInfo, fatchProductInfoLoading } =
  productInfoSlice.actions;

export default productInfoSlice.reducer;
