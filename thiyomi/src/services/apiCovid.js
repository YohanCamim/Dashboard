import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {cartesianCoordinateConverter} from "./cartesianCoordinateConverter"

export const getCovidAPI = createApi({
    reducerPath: "getCovidAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "https://disease.sh/v3/covid-19/" }),
    endpoints: (builder) => ({

        covid: builder.query({ query: (param1) => `countries/${param1.toLowerCase()}` }),

        // vaccine: builder.query({ query: (param1) =>`vaccine/coverage/countries/${param1.toLowerCase()}` }),
        vaccine: builder.query({
            query: (param1) => {const endpoint = !param1 ? "not-chosen" : !param1.length ? "not-chosen" : param1.toLowerCase();
              return `vaccine/coverage/countries/${endpoint}`;
            },
            transformResponse: (response) => ({
              cases: cartesianCoordinateConverter(response.timeline),
              deaths: [],
              recovered: [],
              hasVaccines: true,
              hasTimelineSequence:
                typeof response.timeline === "number" ? false : true,
              country: "",
              provinces: "",
              state: "",
              county: "",
              updatedAt: response.updatedAt ?? 0,
              population: response.population ?? 0,
            }),
        }),
        
        globalstatistics: builder.query({query: () => `all`,
        transformResponse: (response) => ({
            cases: response.cases,
            deaths: response.deaths,
            recovered: response.recovered,
            hasVaccines: false,
            hasTimelineSequence: typeof response.cases === "number" ? false : true,
            country: "",
            provinces: "",
            state: "",
            county: "",
            population: response.population ?? 0,
            updatedAt: new Date(response.updated).toString() ?? 0, // response.updated is in miliseconds since Jan 1, 1970, need to convert to string 
        }),
        }),  
    })
})

export const { useGlobalstatisticsQuery, useVaccineQuery, useCovidQuery } = getCovidAPI; 
















// getTotalPeopleVaccinatedByCountry: builder.query({
//     query: (country) => {
//       const endpoint = !country
//         ? "not-chosen"
//         : !country.length
//         ? "not-chosen"
//         : country.toLowerCase();

//       return `vaccine/coverage/countries/${endpoint}`;
//     },
//     transformResponse: (response) => ({
//       cases: cartesianCoordinateConverter(response.timeline),
//       deaths: [],
//       recovered: [],
//       hasVaccines: true,
//       hasTimelineSequence:
//         typeof response.timeline === "number" ? false : true,
//       country: "",
//       provinces: "",
//       state: "",
//       county: "",
//       updatedAt: response.updatedAt ?? 0,
//       population: response.population ?? 0,
//     }),
//   }),

// getSpecificCountryTotal: builder.query({
//     // get totals for a specific country
//     query: (country) => `countries/${country.toLowerCase()}`,
//   }),





// getGlobalCovidStats: builder.query({
//     query: () => `all`,
//     transformResponse: (response) => ({
//       cases: response.cases,
//       deaths: response.deaths,
//       recovered: response.recovered,
//       hasVaccines: false,
//       hasTimelineSequence: typeof response.cases === "number" ? false : true,
//       country: "",
//       provinces: "",
//       state: "",
//       county: "",
//       population: response.population ?? 0,
//       updatedAt: new Date(response.updated).toString() ?? 0, // response.updated is in miliseconds since Jan 1, 1970, need to convert to string 
//     }),
//   }),