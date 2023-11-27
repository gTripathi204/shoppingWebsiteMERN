import { createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  productList: [],
};



export const productListSlice = createSlice({
  name: "productss",
  initialState,
  reducers: {
    fatchProducts: (state, action) => {
      state.productList.push(action.payload) ;
    },
    
  },
});

export const { fatchProducts } = productListSlice.actions;

export default productListSlice.reducer;
