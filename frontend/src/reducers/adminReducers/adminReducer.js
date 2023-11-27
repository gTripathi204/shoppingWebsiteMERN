import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    adminLoggedIn : null 
}

const adminReducerSlice = createSlice({
    name : "admin",
    initialState , 
    reducers : {
        addAdminLogin : (state , action) => {
            state.adminLoggedIn = action.payload ;
        } , 
        removeAdminLogin : (state , action) => {
            state.adminLoggedIn = null ;
        }
    },
})

export const {addAdminLogin , removeAdminLogin} = adminReducerSlice.actions;

export default adminReducerSlice.reducer ;