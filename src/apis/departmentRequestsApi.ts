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
    updateDepartmentRequestStatusRequest: builder.mutation<any, { requestId: string; status: 'Accepted' | 'Pending' | 'Delivered' | 'Cancelled' }>({
      query: ({ requestId, status }) => ({
        method: 'PUT',
        url: `/${requestId}`,
        body: { status: status.toUpperCase() }
      }),
      invalidatesTags: [{ type: 'DepartmentRequests' }]
    }),

    // deleteADepartmentRequestRequest: builder.mutation<any, { requestId: string }>({
    //   query: ({ requestId }) => ({
    //     method: 'DELETE',
    //     url: `/${requestId}`,
    //   }),
    //   invalidatesTags: [{ type: 'DepartmentRequests' }]
    // }),
  })
})

export const {
  useLazyGetDepartmentRequestsRequestQuery,
  useLazyGetADepartmentRequestRequestQuery,
  useGetADepartmentRequestRequestQuery,
  useUpdateDepartmentRequestStatusRequestMutation
} = departmentRequestsApi

export default departmentRequestsApi