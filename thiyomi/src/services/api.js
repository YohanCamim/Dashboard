import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const getCoinAPI = createApi({
    reducerPath: "getCoinAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3/" }),
    endpoints: (builder) => ({
        contacts: builder.query({ query: () =>'coins/list' }),
        simple : builder.query({ query: () =>'simple/supported_vs_currencies' }),
        combined: builder.query({ query: ({param1, param2}) => `simple/price?ids=${param1}&vs_currencies=${param2}` })
    })
})

export const { useContactsQuery, useSimpleQuery, useCombinedQuery } = getCoinAPI;  // on rajoutera useContactQuery a la suite, dans l'objet, pour l'option B
















//query: ({param1, param2}) =>  'simple/price?ids=${param1}&vs_currencies=${param2}'
// contact: builder.query({
            //     query: (id) =>'coins/list/${id}'
            // })