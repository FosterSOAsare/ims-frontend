import { configureStore, Middleware } from "@reduxjs/toolkit";
import authApi from "./apis/authApi";
import departmentsApi from "./apis/departmentsApi";
import categoriesApi from "./apis/itemCategories";
import usersApi from "./apis/usersApi";
import suppliersApi from './apis/suppliersApi'
import drugsApi from "./apis/drugsApi";
import drugOrdersApi from "./apis/drugOrdersApi";
import itemRequestsApi from "./apis/itemRequestsApi";

const middlewares: Array<Middleware> = [
  authApi.middleware,
  departmentsApi.middleware,
  categoriesApi.middleware,
  usersApi.middleware,
  suppliersApi.middleware,
  drugsApi.middleware,
  drugOrdersApi.middleware,
  itemRequestsApi.middleware,
]

const makeStore = () => (
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [departmentsApi.reducerPath]: departmentsApi.reducer,
      [categoriesApi.reducerPath]: categoriesApi.reducer,
      [usersApi.reducerPath]: usersApi.reducer,
      [suppliersApi.reducerPath]: suppliersApi.reducer,
      [drugsApi.reducerPath]: drugsApi.reducer,
      [drugOrdersApi.reducerPath]: drugOrdersApi.reducer,
      [itemRequestsApi.reducerPath]: itemRequestsApi.reducer
    },

    middleware: (getDefaultMiddleware: any) => (
      getDefaultMiddleware().concat(middlewares)),
  }))

const store = makeStore()

export default store