import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createAuthorizationHeader } from '../utils/session';

const suppliersApi = createApi({
  reducerPath: 'suppliersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/suppliers`, prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  tagTypes: ['Suppliers', 'Supplier'],
  endpoints: (builder) => ({
    getSuppliersRequest: builder.query<any, { page: number, search?: string }>({
      query: ({ page, search }) => `?pageSize=20&page=${page}&search=${search || ''}`,
      providesTags: () => [{ type: 'Suppliers', }]
    }),
    getASupplierDetailsRequest: builder.query<any, { supplierId: string }>({
      query: ({ supplierId }) => `/${supplierId}`,
      providesTags: ({ supplierId }) => [{ type: 'Supplier', id: supplierId }]
    }),
    createASupplierRequest: builder.mutation<any, any>({
      query: (data) => ({
        method: 'POST',
        url: '/',
        body: data
      }),
      invalidatesTags: [{ type: 'Suppliers' }]
    }),
    updateASupplierRequest: builder.mutation<any, { data: any, supplierId: string }>({
      query: ({ data, supplierId }) => ({
        method: 'PATCH',
        url: `/${supplierId}`,
        body: data
      }),
      invalidatesTags: ({ supplierId }) => [{ type: 'Suppliers' }, { type: 'Supplier', id: supplierId }]
    }),
    deleteASupplierRequest: builder.mutation<any, { supplierId: string }>({
      query: ({ supplierId }) => ({
        method: 'DELETE',
        url: `/${supplierId}`
      }),
      invalidatesTags: () => [{ type: 'Suppliers' }]
    })
  })
})

export const {
  useLazyGetSuppliersRequestQuery,
  useGetASupplierDetailsRequestQuery,
  useLazyGetASupplierDetailsRequestQuery,
  useCreateASupplierRequestMutation,
  useUpdateASupplierRequestMutation,
  useDeleteASupplierRequestMutation
} = suppliersApi

export default suppliersApi