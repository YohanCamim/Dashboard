
import { createSlice } from "@reduxjs/toolkit";

export const authySlice = createSlice( {
    name: "authy",
    initialState: {
        authy:{}
    },
    reducers: {
        addAuthy: (state, action) =>{ 
            state.authy = action.payload
        }
    }
})
export const  { addAuthy } = authySlice.actions
export default authySlice.reducer;