import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../interfaces/interfaces";

interface GetProductsResponse {
      product: Product[]
}

export const productApi = createApi({
      reducerPath: 'productApi',
      baseQuery: fetchBaseQuery({
            baseUrl: 'http://localhost:5000/api',
      }),
      endpoints: (builder) => ({
            getProducts: builder.query<GetProductsResponse, void>({
                  query: () => '/products'
            })
      })

})

export const { useGetProductsQuery } = productApi