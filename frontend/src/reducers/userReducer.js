import { createSlice, nanoid } from "@reduxjs/toolkit";
import { deleteUserDetails } from "./userAllInfoReducer";

const initialState = {
  userLoggedIn: null,
  userLoggedInLoading: false,
};

const userLogingSlice = createSlice({
  name: "userLogged",
  initialState,
  reducers: {
    userLoging: (state, action) => {
      state.userLoggedIn = action.payload;
    },
    userLoginLoading: (state, action) => {
      state.userLoggedInLoading = action.payload;
    },
    userLogout: (state, action) => {
      state.userLoggedIn = null ;
      
    },
  },
});

export const { userLoginLoading, userLoging, userLogout } =
  userLogingSlice.actions;

export default userLogingSlice.reducer;
