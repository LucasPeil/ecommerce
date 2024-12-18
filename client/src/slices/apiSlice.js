import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlBaseQuery } from './graphqlBaseQuery';
import { gql } from 'graphql-request';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: graphqlBaseQuery({
    baseUrl: 'http://localhost:5173/api',
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ first, after, searchText }) => {
        return {
          url: '/products',
          body: gql`
            query {
              getAllProducts(first: ${first}, after: ${after}, searchText: ${searchText}) {
                edges {
                  node {
                    id
                    name
                    images
                    description
                    price
                    available
                    quantity
                  }
                  cursor
                }
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
              }
            }
          `,
        };
      },
      transformResponse: (response) => response.getAllProducts,
    }),
    getProduct: builder.query({
      query: (id) => {
        if (id)
          return {
            url: '/products',
            body: gql`
            query {
              getProduct(id: "${id}") {
                status
                message
                data {
                  id
                  name
                  images
                  category
                  description
                  price
                  available
                  quantity
                }
              }
            }
          `,
          };
      },
      transformResponse: (response) => response.getProduct.data,
    }),
    createProduct: builder.mutation({
      mutation: (product) => ({
        body: gql`
          query {
            createProduct(product: ${product}) {
              status
              message
              data {
                id
                images
                category 
                description
                price
                available
                quantity
              }  
            }
          }
        `,
      }),
      transformResponse: (response) => response.createProduct,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductQuery } = apiSlice;

/* body: gql`
            query {
              posts {
                data {
                  id
                  title
                }
              }
            }
          `,
        }; */
