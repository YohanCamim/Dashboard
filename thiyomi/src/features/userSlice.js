import { createSlice } from "@reduxjs/toolkit";

const initialState=[]

export const userSlice = createSlice( {
    name: "user",
    initialState:[],
    reducers: {
        addUserChange: (state, action) =>{ 
            state.splice(0, state.length)
            //state.push(action.payload)
            state[0] =action.payload
        },
//        clearUserChange () {return [...initialState]}
        clearUserChange: (state) => {state.splice(0, state.length)}
    }
})
export const  { addUserChange, clearUserChange} = userSlice.actions;
export default userSlice.reducer;
