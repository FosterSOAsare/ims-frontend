import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createAuthorizationHeader } from '../utils/session';


const itemRequestsApi = createApi({
  reducerPath: 'itemRequestsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/item-requests`, prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  tagTypes: ['ItemRequests'],
  endpoints: (builder) => ({
    getItemRequestsRequest: builder.query<any, { page: number; search?: string }>({
      query: ({ page, search }) => `?pageSize=20&page=${page}&search=${search}`,
      transformResponse: (response: any) => {
        const { totalPages, rows } = response.data;
        const requests = rows.map((row: any) => {
          return row
        })

        return { totalPages, requests }
      },
      providesTags: () => [{ type: 'ItemRequests' }]
    }),
  })
})

export const {
  useLazyGetItemRequestsRequestQuery
} = itemRequestsApi

export default itemRequestsApi