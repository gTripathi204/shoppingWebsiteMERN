import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    registrationData : {},
    userRegistrationLoading : false 
}



const registrationSlice = createSlice({
    name : "registration", 
    initialState , 
    reducers: {
        userSingnUpLoading : (state , action) => {
             state.userRegistrationLoading = action.payload ;
        } , 
        userSingnUp : (state , action) => {
            state.registrationData = action.payload ; 
        }
    }
})


export const {  userSingnUp , userSingnUpLoading } = registrationSlice.actions;

export default registrationSlice.reducer;
