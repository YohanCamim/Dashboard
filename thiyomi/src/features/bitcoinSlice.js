// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState = {
//     value: []
// }

// export const bitcoinSlice = createSlice( {
//     name: "bitcoin",
//     initialState,
//     reducers: {
//         addBitcoinChange: (state, action) =>{ 
//             state.value.slice(0,2)
//             state.value.push(action.payload)
            
//         }
//     }
// })
// export const  { addBitcoinChange } = bitcoinSlice.actions
// export default bitcoinSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

export const bitcoinSlice = createSlice( {
    name: "bitcoin",
    initialState: {
        bitcoin:['rapp', 'ropp']
    },
    reducers: {
        getBitcoinChange: (state, action) =>{
            state.bitcoin= action.payload;
        },
        addBitcoinChange: (state, action) =>{ 
            // state.bitcoin.slice(0,2)
            state.bitcoin=[action.payload]
        }
    }
})
export const  { addBitcoinChange, getBitcoinChange } = bitcoinSlice.actions
export default bitcoinSlice.reducer;



// les actions du tuto:
// const { usersSuccess } = bitcoinSlice.actions

//  export const fetchUsers = () => async dispatch => {
//     try {
//         await api.get('/users')
//             .then((response) => dispatch(usersSuccess(response.data))) // ici pour alimenter nos preferences BITCOIN: .then((response) => dispatch(addBitcoinChange(response.data)))
//     }
//     catch (e) {
//         return console.error(e.message);
//     }
// }