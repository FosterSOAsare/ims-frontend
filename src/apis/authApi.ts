import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createAuthorizationHeader } from '../utils/session';


const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/auth`, prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  tagTypes: ['USER'],
  endpoints: (builder) => ({
    registerUserRequest: builder.mutation({
      query: (data) => ({
        method: 'POST',
        url: '/register',
        body: data
      }),

    }),
    verifyUserEmailRequest: builder.mutation({
      query: ({ code, email, mode }) => ({
        method: 'POST',
        url: '/verifyEmail',
        body: { code, email, mode }
      }),

    }),
    resendEmailRequest: builder.mutation({
      query: ({ email, mode }: { email: string, mode: string }) => ({
        method: 'POST',
        url: '/resendEmail',
        body: { email, mode }
      })
    }),
    loginRequest: builder.mutation({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { email, password }
      }),
      invalidatesTags: [{ type: 'USER' }]
    }),
    logoutRequest: builder.query<{}, void>({
      query: () => '/logout',
      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   await queryFulfilled;
      //   dispatch(userApi.util.invalidateTags(["User"]));
      // },
    }),
    changePassword: builder.mutation({
      query: () => ({
        url: '/changePassword'
      })
    }),
    requestPasswordResetRequest: builder.mutation<any, { email: string }>({
      query: ({ email }) => ({
        method: 'POST',
        url: '/forgot-password/send-mail',
        body: { email: email }
      })
    }),
    validatePasswordResetCodeRequest: builder.mutation<any, { email: string, code: number }>({
      query: ({ code, email }) => ({
        method: 'POST',
        url: '/forgot-password/validate-code',
        body: { code, email }
      })
    }),
    setNewPasswordResetRequest: builder.mutation({
      query: ({ newPassword, email }) => ({
        method: 'PATCH',
        url: '/forgot-password/reset',
        body: { newPassword, email }
      })
    }),

    fetchLoggedInUserRequest: builder.query<any, void>({
      query: () => '/user',
      providesTags: () => [{ type: 'USER' }]
    })

  })
})

export const {
  useRegisterUserRequestMutation,
  useResendEmailRequestMutation,
  useVerifyUserEmailRequestMutation,
  useLoginRequestMutation,
  useLazyLogoutRequestQuery,
  useRequestPasswordResetRequestMutation,
  useSetNewPasswordResetRequestMutation,
  useFetchLoggedInUserRequestQuery,
  useValidatePasswordResetCodeRequestMutation
} = authApi

export default authApi