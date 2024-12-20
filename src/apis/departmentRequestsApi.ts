import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createAuthorizationHeader } from '../utils/session';


const departmentRequestsApi = createApi({
  reducerPath: 'departmentRequestsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/department-requests`, prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  tagTypes: ['DepartmentRequests', 'DepartmentRequest'],
  endpoints: (builder) => ({
    getDepartmentRequestsRequest: builder.query<any, { page: number; search?: string }>({
      query: ({ page, search }) => `?pageSize=20&page=${page}&search=${search}`,
      transformResponse: (response: any) => {
        const { totalPages, rows } = response.data;
        const requests = rows.map((row: any) => {
          return row
        })

        return { totalPages, requests }
      },
      providesTags: () => [{ type: 'DepartmentRequests' }]
    }),
    getADepartmentRequestRequest: builder.query<any, { requestId: string }>({
      query: ({ requestId }) => `/${requestId}`,

      providesTags: ({ requestId }) => [{ type: 'DepartmentRequest', id: requestId }]
    }),
    createADepartmentRequestRequest: builder.mutation<any, { itemId: string; additionalNotes: string; quantity: number }>({
      query: ({ itemId, quantity, additionalNotes }) => ({
        method: 'POST',
        url: '/',
        body: { itemId, quantity, additionalNotes }
      }),
      invalidatesTags: [{ type: 'DepartmentRequests' }]
    }),
    updateADepartmentRequestRequest: builder.mutation<any, { requestId: string; itemId: string; additionalNotes: string; quantity: number }>({
      query: ({ itemId, quantity, additionalNotes, requestId }) => ({
        method: 'PATCH',
        url: `/${requestId}`,
        body: { itemId, quantity, additionalNotes }
      }),
      invalidatesTags: ({ requestId }) => [{ type: 'DepartmentRequests' }, { type: 'DepartmentRequest', id: requestId }]
    }),
    deleteADepartmentRequestRequest: builder.mutation<any, { requestId: string }>({
      query: ({ requestId }) => ({
        method: 'DELETE',
        url: `/${requestId}`,
      }),
      invalidatesTags: [{ type: 'DepartmentRequests' }]
    }),
  })
})

export const {
  useLazyGetDepartmentRequestsRequestQuery,
  useCreateADepartmentRequestRequestMutation,
  useUpdateADepartmentRequestRequestMutation,
  useLazyGetADepartmentRequestRequestQuery,
  useDeleteADepartmentRequestRequestMutation
} = departmentRequestsApi

export default departmentRequestsApi