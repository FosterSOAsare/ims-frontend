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
    getDrugsRequest: builder.query<any, { page: number; search: string }>({
      query: ({ page, search }) => `?pageSize=20&page=${page}&search=${search}`,
      transformResponse: (response: any) => {
        let { rows, totalPages } = response.data
        let drugs = rows.map((row: any) => {
          const { brandName, name, stock, categoryId, reorderPoint, status, batch, supplierId } = row
          return { brandName, name, stock, category: categoryId?.name || '-', reorderPoint, status, batchNumber: batch.batchNumber, supplier: supplierId || '-' }
        })
        return { drugs, totalPages }
      },
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
