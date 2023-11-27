import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  userAllDetails: null,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    putUserDetails: (state, action) => {
      state.userAllDetails = action.payload;
    },
    deleteUserDetails: (state, action) => {
      state.userAllDetails = null ;
    },
  },
});

export const { putUserDetails , deleteUserDetails} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
