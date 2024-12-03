import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createAuthorizationHeader } from '../utils/session';


const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/item-categories`, prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getItemCategories: builder.query<any, void>({
      query: () => `?pageSize=20`,
      providesTags: () => [{ type: 'Categories' }]
    }),
    createAnItemCategoryRequest: builder.mutation<any, { name: string }>({
      query: ({ name }) => ({
        method: 'POST',
        url: '/',
        body: { name }
      }),
      invalidatesTags: [{ type: 'Categories' }]
    }),
    editAnItemCategoryRequest: builder.mutation<any, { name: string; categoryId: string }>({
      query: ({ name, categoryId }) => ({
        method: 'PATCH',
        url: `/${categoryId}`,
        body: { name }
      }),
      invalidatesTags: [{ type: 'Categories' }]
    }),
    deleteAnItemCategoryRequest: builder.mutation<any, { categoryId: string }>({
      query: ({ categoryId }) => ({
        method: 'DELETE',
        url: `/${categoryId}`,
      }),
      invalidatesTags: [{ type: 'Categories' }]
    }),
  })

})

export const {
  useGetItemCategoriesQuery,
  useCreateAnItemCategoryRequestMutation,
  useEditAnItemCategoryRequestMutation,
  useDeleteAnItemCategoryRequestMutation,
} = categoriesApi

export default categoriesApi
