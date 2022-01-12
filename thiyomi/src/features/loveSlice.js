import { createSlice } from "@reduxjs/toolkit";

export const loveSlice = createSlice( {
    name: "love",
    initialState: {
        love:['John','Alice']
    },
    reducers: {
        getLoveChange: (state, action) =>{
            state.love= action.payload;
        },
        addLoveChange: (state, action) =>{ 
            state.love=action.payload
        }
    }
})
export const  { addLoveChange, getLoveChange } = loveSlice.actions;
export default loveSlice.reducer;


// A corriger par Micka au cas ou