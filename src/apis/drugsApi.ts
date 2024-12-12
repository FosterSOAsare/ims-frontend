import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createAuthorizationHeader } from '../utils/session';


const drugsApi = createApi({
  reducerPath: 'drugsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/items`, prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  tagTypes: ['Drugs'],
  endpoints: (builder) => ({
    getDrugsRequest: builder.query<any, { page: number; search: string  }>({
      query: ({ page, search }) => `?pageSize=20&page=${page}&search=${search}`,
      providesTags: () => [{ type: 'Drugs' }]
    }),
    createADrugRequest: builder.mutation<any, { name: string }>({
      query: ({ name }) => ({
        method: 'POST',
        url: '/',
        body: { name }
      }),
      invalidatesTags: [{ type: 'Drugs' }]
    }),
    editADrugRequest: builder.mutation<any, { name: string; drugId: string }>({
      query: ({ name, drugId }) => ({
        method: 'PATCH',
        url: `/${drugId}`,
        body: { name }
      }),
      invalidatesTags: [{ type: 'Drugs' }]
    }),
    deleteADrugRequest: builder.mutation<any, { drugId: string }>({
      query: ({ drugId }) => ({
        method: 'DELETE',
        url: `/${drugId}`,
      }),
      invalidatesTags: [{ type: 'Drugs' }]
    }),
  })

})

export const {
  useLazyGetDrugsRequestQuery,
  useCreateADrugRequestMutation,
  useEditADrugRequestMutation,
  useDeleteADrugRequestMutation,
} = drugsApi

export default drugsApi
