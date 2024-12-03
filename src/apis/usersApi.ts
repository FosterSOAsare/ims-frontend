import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createAuthorizationHeader } from '../utils/session';


const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/admin`, prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<any, { page: number }>({
      query: ({ page }) => `/users?pageSize=20&page=${0}`,
      providesTags: () => [{ type: 'Users' }]
    }),
    createANewUserRequest: builder.mutation<any, { fullName: string; email: string; departmentId: string; permissions: string[]; password: string; role: string }>({
      query: ({ fullName, password, permissions, role, email, departmentId }) => ({
        method: 'POST',
        url: '/user',
        body: { fullName, password, permissions, role, email, departmentId }
      }),
      invalidatesTags: [{ type: 'Users' }]
    }),
    editADepartmentRequest: builder.mutation<any, { name: string; departmentId: string }>({
      query: ({ name, departmentId }) => ({
        method: 'PATCH',
        url: `/${departmentId}`,
        body: { name }
      }),
      invalidatesTags: [{ type: 'Users' }]
    }),
    deleteADepartmentRequest: builder.mutation<any, { departmentId: string }>({
      query: ({ departmentId }) => ({
        method: 'DELETE',
        url: `/${departmentId}`,
      }),
      invalidatesTags: [{ type: 'Users' }]
    }),
    getUserRolesRequest: builder.query<any, void>({
      query: () => '/roles'
    })
  })

})

export const {
  useLazyGetUsersQuery,
  useCreateANewUserRequestMutation,
  useEditADepartmentRequestMutation,
  useDeleteADepartmentRequestMutation,
  useGetUserRolesRequestQuery
} = usersApi

export default usersApi
