import { configureStore, Middleware } from "@reduxjs/toolkit";
import authApi from "./apis/authApi";
import departmentsApi from "./apis/departmentsApi";
import categoriesApi from "./apis/itemCategories";


const middlewares: Array<Middleware> = [
  authApi.middleware,
  departmentsApi.middleware,
  categoriesApi.middleware,
]

const makeStore = () => (
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [departmentsApi.reducerPath]: departmentsApi.reducer,
      [categoriesApi.reducerPath]: categoriesApi.reducer
    },

    middleware: (getDefaultMiddleware: any) => (
      getDefaultMiddleware().concat(middlewares)),
  }))

const store = makeStore()

export default store