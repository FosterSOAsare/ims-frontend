import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createAuthorizationHeader } from '../utils/session';


const itemRequestsApi = createApi({
  reducerPath: 'itemRequestsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/item-requests`, prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  tagTypes: ['ItemRequests', 'ItemRequest'],
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
    getAnItemRequestRequest: builder.query<any, { requestId: string }>({
      query: ({ requestId }) => `/${requestId}`,

      providesTags: ({ requestId }) => [{ type: 'ItemRequest', id: requestId }]
    }),
    createAnItemRequestRequest: builder.mutation<any, { itemId: string; additionalNotes: string; quantity: number }>({
      query: ({ itemId, quantity, additionalNotes }) => ({
        method: 'POST',
        url: '/',
        body: { itemId, quantity, additionalNotes }
      }),
      invalidatesTags: [{ type: 'ItemRequests' }]
    }),
    updateAnItemRequestRequest: builder.mutation<any, { requestId: string; itemId: string; additionalNotes: string; quantity: number }>({
      query: ({ itemId, quantity, additionalNotes, requestId }) => ({
        method: 'PATCH',
        url: `/${requestId}`,
        body: { itemId, quantity, additionalNotes }
      }),
      invalidatesTags: ({ requestId }) => [{ type: 'ItemRequests' }, { type: 'ItemRequest', id: requestId }]
    }),
  })
})

export const {
  useLazyGetItemRequestsRequestQuery,
  useCreateAnItemRequestRequestMutation,
  useUpdateAnItemRequestRequestMutation,
  useLazyGetAnItemRequestRequestQuery
} = itemRequestsApi

export default itemRequestsApi