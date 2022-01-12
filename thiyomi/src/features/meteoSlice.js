
import { createSlice } from "@reduxjs/toolkit";

export const meteoSlice = createSlice( {
    name: "meteo",
    initialState: {
        meteo:["lyon"]
    },
    reducers: {
        getMeteoChange: (state, action) =>{
            state.meteo= action.payload;
        },
        addMeteoChange: (state, action) =>{ 
            state.meteo=[action.payload]
        }
    }
})
export const  { addMeteoChange, getMeteoChange } = meteoSlice.actions;
export default meteoSlice.reducer;
