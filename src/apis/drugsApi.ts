import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createAuthorizationHeader } from '../utils/session';


const drugsApi = createApi({
  reducerPath: 'drugsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/items`, prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  tagTypes: ['Drugs', 'Drug'],
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
    getADrugRequest: builder.query<any, { drugId: string }>({
      query: ({ drugId }) => `/${drugId}`,
      providesTags: ({ drugId }) => [{ type: 'Drugs' }, { type: 'Drug', id: drugId }]
    }),
    createADrugRequest: builder.mutation<any, any>({
      query: (data) => ({
        method: 'POST',
        url: '/',
        body: data
      }),
      invalidatesTags: [{ type: 'Drugs' }]
    }),
    editADrugRequest: builder.mutation<any, { data: any; drugId: string }>({
      query: ({ data, drugId }) => ({
        method: 'PATCH',
        url: `/${drugId}`,
        body: data
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
