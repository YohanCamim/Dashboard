import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import bitcoinReducer from "../features/bitcoinSlice";
import authyReducer from "../features/authySlice"
import meteoReducer from '../features/meteoSlice'
import userReducer from "../features/userSlice"
import loveReducer from "../features/loveSlice";
import covidReducer from "../features/covidSlice"
import { getAuthAPI } from "../services/apiAuth";
import { getLoveAPI } from "../services/apiLove";
import {getCovidAPI} from "../services/apiCovid"
import { getCoinAPI } from "../services/api";
import { getMeteoAPI } from "../services/apiMeteo";

export const store = configureStore({
    reducer: {
        authy: authyReducer,
        bitcoin: bitcoinReducer,
        meteo: meteoReducer,
        love: loveReducer,
        user: userReducer,
        covid: covidReducer,
        [getMeteoAPI.reducerPath]: getMeteoAPI.reducer,
        [getCoinAPI.reducerPath]: getCoinAPI.reducer,
        [getCovidAPI.reducerPath]: getCovidAPI.reducer,
        [getAuthAPI.reducerPath]: getAuthAPI.reducer,
        [getLoveAPI.reducerPath]: getLoveAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getCoinAPI.middleware)
})




//export type RootState = ReturnType<typeof store.getState> 
//export type AppDispatch = typeof store.dispatch