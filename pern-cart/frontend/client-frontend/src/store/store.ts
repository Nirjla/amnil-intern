import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../api/productApi";
import authReducer from '../slices/authSlice'
import { cartApi } from "../api/cartApi";
import { checkoutApi } from "../api/checkoutApi";
const store = configureStore({
      reducer: {
            auth: authReducer,
            [productApi.reducerPath]: productApi.reducer,
            [cartApi.reducerPath]: cartApi.reducer,
            [checkoutApi.reducerPath]: checkoutApi.reducer
      },
      middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(productApi.middleware, cartApi.middleware, checkoutApi.middleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store