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
    getSuppliers: builder.query<any, { page: number, search?: string }>({
      query: ({ page, search }) => `?pageSize=20&page=${page}&search=${search || ''}`,
      providesTags: () => [{ type: 'Suppliers', }]
    }),
    getASupplierDetails: builder.query<any, { supplierId: string }>({
      query: ({ supplierId }) => `/${supplierId}`,
      providesTags: ({ supplierId }) => [{ type: 'Supplier', id: supplierId }]
    }),
  })
})

export const {
  useLazyGetSuppliersQuery,
  useGetASupplierDetailsQuery
} = suppliersApi

export default suppliersApi