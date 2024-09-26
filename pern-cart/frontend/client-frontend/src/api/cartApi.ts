import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { ICart } from "../interfaces/interfaces";

export const cartApi = createApi({
      reducerPath: 'cartApi',
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
            getCartByUserId: builder.query<ICart, string>({
                  query: (userId) => ({
                        url: `/cart/${userId}`,
                        method: 'GET'
                  })
            }),
            addToCart: builder.mutation({
                  query: (userData: { userId: string; productId: string; quantity: number }) => ({
                        url: '/cart',
                        method: 'POST',
                        body: userData
                  })
            }),
            removeProductFromCart: builder.mutation({
                  query: (userData: { userId: string, productId: string }) => ({
                        url: '/cart',
                        method: 'DELETE',
                        body: userData

                  }),
            }),
            updateCartQuantity: builder.mutation({
                  query: (userData: { userId: string; productId: string; quantity: number }) => ({
                        url: '/cart',
                        method: 'PUT',
                        body: userData
                  })

            })
      })

})

export const { useGetCartByUserIdQuery, useAddToCartMutation, useRemoveProductFromCartMutation, useUpdateCartQuantityMutation } = cartApi;