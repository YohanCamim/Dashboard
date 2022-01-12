import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const getLoveAPI = createApi({
    reducerPath: "getLoveAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://love-calculator.p.rapidapi.com",
    }),
    endpoints: (builder) => ({
        love: builder.query({
            query: ({ param1, param2 }) => ({
                url: `/getPercentage?fname=${param1}&sname=${param2}`,
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'love-calculator.p.rapidapi.com',
                    'x-rapidapi-key': '70e0f44a17msh2f3c921c2106abep1199ddjsn813ff53f473b'
                }
            })
        })
    })
})
export const { useLoveQuery } = getLoveAPI;

// A corriger par Micka au cas ou
