import { createSlice } from "@reduxjs/toolkit";

export const covidSlice = createSlice( {
    name: "covid",
    initialState: {
        covid:["france"]
    },
    reducers: {
        getCovidChange: (state, action) =>{
            state.covid= action.payload;
        },
        addCovidChange: (state, action) =>{ 
            state.covid=[action.payload]
        }
    }
})
export const  { addCovidChange, getCovidChange } = covidSlice.actions;
export default covidSlice.reducer;
