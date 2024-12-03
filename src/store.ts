import { configureStore, Middleware } from "@reduxjs/toolkit";
import authApi from "./apis/authApi";
import departmentsApi from "./apis/departmentsApi";


const middlewares: Array<Middleware> = [
  authApi.middleware,
  departmentsApi.middleware,
]

const makeStore = () => (
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [departmentsApi.reducerPath]: departmentsApi.reducer
    },

    middleware: (getDefaultMiddleware: any) => (
      getDefaultMiddleware().concat(middlewares)),
  }))

const store = makeStore()

export default store