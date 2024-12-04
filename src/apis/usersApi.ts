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
    changeUserAccountStatusRequest: builder.mutation<any, { userId: string; status: 'activate' | 'deactivate' }>({
      query: ({ userId, status }) => ({
        method: 'PATCH',
        url: `/users/${userId}/${status}`,
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
    getAllRolesRequest: builder.query<any, void>({
      query: () => '/roles'
    }),
    getAUserRequest: builder.query<any, { userId: string }>({
      query: ({ userId }) => `/users/${userId}`
    }),
    updateUserRoleRequest: builder.mutation<any, { permissions: string[]; userId: string; role: string }>({
      query: ({ permissions, role, userId, }) => ({
        method: 'PATCH',
        url: `/users/${userId}/role`,
        body: { permissions, role, }
      }),
      invalidatesTags: [{ type: 'Users' }]
    }),
  })

})

export const {
  useLazyGetUsersQuery,
  useCreateANewUserRequestMutation,
  useChangeUserAccountStatusRequestMutation,
  useDeleteADepartmentRequestMutation,
  useGetAllRolesRequestQuery,
  useLazyGetAUserRequestQuery,
  useUpdateUserRoleRequestMutation
} = usersApi

export default usersApi
