import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createAuthorizationHeader } from '../utils/session';


const departmentsApi = createApi({
  reducerPath: 'departmentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/departments`, prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  tagTypes: ['Departments'],
  endpoints: (builder) => ({
    getDepartments: builder.query<any, void>({
      query: () => `?pageSize=20`,
      providesTags: () => [{ type: 'Departments' }]
    }),
    createADepartmentRequest: builder.mutation<any, { name: string }>({
      query: ({ name }) => ({
        method: 'POST',
        url: '/',
        body: { name }
      }),
      invalidatesTags: [{ type: 'Departments' }]
    }),
    editADepartmentRequest: builder.mutation<any, { name: string; departmentId: string }>({
      query: ({ name, departmentId }) => ({
        method: 'PATCH',
        url: `/${departmentId}`,
        body: { name }
      }),
      invalidatesTags: [{ type: 'Departments' }]
    }),
    deleteADepartmentRequest: builder.mutation<any, { departmentId: string }>({
      query: ({ departmentId }) => ({
        method: 'DELETE',
        url: `/${departmentId}`,
      }),
      invalidatesTags: [{ type: 'Departments' }]
    }),
  })

})

export const {
  useGetDepartmentsQuery,
  useCreateADepartmentRequestMutation,
  useEditADepartmentRequestMutation,
  useDeleteADepartmentRequestMutation,
} = departmentsApi

export default departmentsApi
