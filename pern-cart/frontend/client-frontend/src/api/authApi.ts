import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store"
export const authApi = createApi({
      reducerPath: 'authApi',
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
            signup: builder.mutation({
                  query: (userData: { name: string, email: string, password: string }) => ({
                        url: '/auth/signup',
                        method: 'POST',
                        body: userData
                  })
            }),
            signin: builder.mutation({
                  query: (credentials: { email: string, password: string }) => ({
                        url: '/auth/signin',
                        method: 'POST',
                        body: credentials
                  })
            })
      })

})

export const { useSignupMutation, useSigninMutation } = authApi