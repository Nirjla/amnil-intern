import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

export const checkoutApi = createApi({
      reducerPath: 'checkout.api',
      baseQuery: fetchBaseQuery({
            baseUrl: 'http://localhost:5000/api',
            prepareHeaders: (headers, { getState }) => {
                  const token = (getState() as RootState).auth.token;
                  if (token) {
                        headers.set('authorization', `Bearer ${token}`);
                  }
                  return headers;

            },
      }),
      endpoints: (builder) => ({
            createCheckout: builder.mutation({
                  query: (userData: { userId: string, paymentMethod: string, shippingAddress: string }) => ({
                        url: '/checkout',
                        method: 'POST',
                        body: userData
                  })

            })
      })
})

export const { useCreateCheckoutMutation } = checkoutApi