import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const getAuthAPI = createApi({
    reducerPath : "getAuthAPI",
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:3000/",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("ownTokken")
            if (token) { headers.set('authorization', `Bearer ${token}`)}
            return headers
        },
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        addContact: builder.mutation({query: (contact) => ({
                url: 'auth/signup', 
                method: 'POST', 
                body: contact })
        }),
        logContact: builder.mutation({query: (contact) => ({
                url: 'auth/login', 
                method: 'POST', 
                body: contact}), invalidatesTags:['User'] 
        }),
        getContact: builder.query({ query: () => 'widgets/me', providesTags:['User']}),
        addCryptoPreference: builder.mutation({query: (cryptoPreference) => ({
                url: 'widgets/crypto', 
                method: 'POST', 
                body: cryptoPreference}), invalidatesTags:['User'] 
        }),
        addMeteoPreference: builder.mutation({query: (meteoPreference) => ({
            url: 'widgets/meteo', 
            method: 'POST', 
            body: meteoPreference}), invalidatesTags:['User'] 
        }),
        addCovidPreference: builder.mutation({query: (covidPreference) => ({
            url: 'widgets/covid', 
            method: 'POST', 
            body: covidPreference}), invalidatesTags:['User'] 
        }),
        addLovePreference: builder.mutation({query: (lovePreference) => ({
            url: 'widgets/love', 
            method: 'POST', 
            body: lovePreference}), invalidatesTags:['User'] 
        }),
        addPreference: builder.mutation({query: (preferenceSynthese) => ({
            url: 'widgets/test', 
            method: 'POST', 
            body: preferenceSynthese}), invalidatesTags:['User'] 
        }),
        deletePreference: builder.mutation({query: (deletePreference) => ({
            url: 'widgets/deletetest', 
            method: 'POST', 
            body: deletePreference}), invalidatesTags:['User'] 
        }),
    })
})
export const {
    useAddContactMutation, useLogContactMutation, useGetContactQuery, useAddCryptoPreferenceMutation, useAddMeteoPreferenceMutation, useAddCovidPreferenceMutation, useAddLovePreferenceMutation, useAddPreferenceMutation, useDeletePreferenceMutation
} = getAuthAPI;










//        registration: builder.mutation({ query: ({credentials}) => ({url: "signup", method: "POST", body: {credentials}}) })
