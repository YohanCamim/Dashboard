// c733e52804700f7f126426570f157c9c
//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=c733e52804700f7f126426570f157c9c


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const getMeteoAPI = createApi({
    reducerPath: "getMeteoAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://api.openweathermap.org/data/2.5" }),
    endpoints: (builder) => ({
        meteo: builder.query({ query: (param1) => `/weather?q=${param1}&units=metric&APPID=c733e52804700f7f126426570f157c9c` })
    })
})
export const { useMeteoQuery } = getMeteoAPI;  
