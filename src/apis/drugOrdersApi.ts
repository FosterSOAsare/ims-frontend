import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createAuthorizationHeader } from '../utils/session';



const drugOrdersApi = createApi({
  reducerPath: 'drugOrdersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/item-orders`, prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  tagTypes: ['ItemOrders', 'ItemOrder'],
  endpoints: (builder) => ({
    getDrugOrders: builder.query<any, { page: number, search?: string }>({
      query: ({ page, search }) => `?pageSize=20&page=${page}&search=${search || ''}`,
      transformResponse: (response: any) => {
        let { rows, totalPages } = response.data
        const orders = rows?.map((row: any) => {
          const { orderNumber, id, date, quantity, expectedDeliveryDate, status, item, supplier, } = row
          return { orderNumber, id, date, quantity, expectedDeliveryDate, status, drugName: item?.name, supplierName: supplier?.name }
        })

        return { orders, totalPages }
      },
      providesTags: () => [{ type: 'ItemOrders', }]
    }),
    getADrugOrderRequest: builder.query<any, { orderId: string }>({
      query: ({ orderId }) => `/${orderId}`,
      // transformResponse: (response: any) => {
      //   let { rows, totalPages } = response.data
      //   const orders = rows?.map((row: any) => {
      //     const { orderNumber, id, date, quantity, expectedDeliveryDate, status, item, supplier, } = row
      //     return { orderNumber, id, date, quantity, expectedDeliveryDate, status, drugName: item?.name, supplierName: supplier?.name }
      //   })

      //   return { orders, totalPages }
      // },
      providesTags: ({ orderId }) => [{ type: 'ItemOrder', id: orderId }]
    }),
    createADrugOrderRequest: builder.mutation<any, {
      itemId: string; quantity: number; supplierId: string; additionalNotes: string; expectedDeliveryDate: Date; paymentMethod: string; deliveryMethod: string; deliveryAddress: string; status: string
    }>({
      query: ({ itemId, quantity, supplierId, additionalNotes, expectedDeliveryDate, paymentMethod, deliveryMethod, deliveryAddress, status }) => ({
        method: 'POST',
        url: '/',
        body: { itemId, quantity, supplierId, additionalNotes, expectedDeliveryDate, paymentMethod, deliveryMethod, deliveryAddress, status }
      }),
      invalidatesTags: [{ type: 'ItemOrders' }]
    }),
    updateADrugOrderRequest: builder.mutation<any, {
      orderId: string; itemId: string; quantity: number; supplierId: string; additionalNotes: string; expectedDeliveryDate: Date; paymentMethod: string; deliveryMethod: string; deliveryAddress: string; status: string
    }>({
      query: ({ itemId, quantity, supplierId, additionalNotes, expectedDeliveryDate, paymentMethod, deliveryMethod, deliveryAddress, orderId, status }) => ({
        method: 'PATCH',
        url: `/${orderId}`,
        body: { itemId, quantity, supplierId, additionalNotes, expectedDeliveryDate, paymentMethod, deliveryMethod, deliveryAddress, status }
      }),
      invalidatesTags: ({ orderId }) => [{ type: 'ItemOrders' }, , { type: 'ItemOrder', id: orderId }]
    }),
    deleteADrugOrderRequest: builder.mutation<any, { orderId: string }>({
      query: ({ orderId }) => ({
        method: 'DELETE',
        url: `/${orderId}`,
      }),
      invalidatesTags: [{ type: 'ItemOrders' }]
    }),
    changeADrugOrderStatusRequest: builder.mutation<any, { orderId: string; status: 'requested' | 'draft' | 'cancelled' | 'delivering' | 'received' }>({
      query: ({ orderId, status }) => ({
        method: 'PUT',
        url: `/state/${orderId}`,
        body: { status }
      }),
      invalidatesTags: ({ orderId }) => [{ type: 'ItemOrders' }, { type: 'ItemOrder', id: orderId }]
    }),
  })
})

export const {
  useLazyGetDrugOrdersQuery,
  useCreateADrugOrderRequestMutation,
  useUpdateADrugOrderRequestMutation,
  useLazyGetADrugOrderRequestQuery,
  useDeleteADrugOrderRequestMutation,
  useChangeADrugOrderStatusRequestMutation
} = drugOrdersApi

export default drugOrdersApi