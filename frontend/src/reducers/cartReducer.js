import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productPresent = state.cartItems.find(
        (element) => element._id === action.payload._id
      );
      if (productPresent) {
        const index = state.cartItems.findIndex(
          (x) => x._id === action.payload._id
        );
        state.cartItems[index] = action.payload;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const elements = state.cartItems.filter((x)=> x._id !== action.payload) ;
      state.cartItems = elements ;
    },
    removeAllFromCart : (state , action) => {
      state.cartItems = [] ;
    }
  },
});

export const { addToCart ,removeFromCart ,removeAllFromCart} = cartSlice.actions;

export default cartSlice.reducer;
