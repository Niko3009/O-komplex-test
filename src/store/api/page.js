import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { DOMAIN, PATH } from '@/global/data/api'
import createRoute from '@/global/funcs/createRoute'

export const api = createApi({
  reducerPath: 'zhendong-api',
  baseQuery: fetchBaseQuery({ baseUrl: DOMAIN }),
  endpoints: (builder) => ({
    getPageData: builder.query({
      query: ({ path }) => createRoute([PATH.page, path]),
    }),
    getOptionsData: builder.query({
      query: () => PATH.options,
    }),
  }),
})
export default api

export const { reducerPath, reducer, middleware, endpoints } = api

export const { useGetPageDataQuery, useGetOptionsDataQuery } = api

export const { getPageData, getOptionsData } = endpoints
