import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlBaseQuery } from './graphqlBaseQuery';
import { gql } from 'graphql-request';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: graphqlBaseQuery({
    /*   baseUrl: 'https://graphqlzero.almansi.me/api', */
    baseUrl: 'http://localhost:5173/api',

    /*  /api/products */
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ first, after }) => {
        return {
          url: '/products',
          body: gql`
            query {
              getAllProducts(first: ${first}, after: "${after}") {
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
    getPost: builder.query({
      /*************  ✨ Codeium Command ⭐  *************/
      /******  63369f05-0d55-403d-b92e-790a3ae45644  *******/
      query: (id) => ({
        body: gql`
          query {
            post(id: ${id}) {
              id
              title
              body
            }
          }
          `,
      }),
      transformResponse: (response) => response.post,
    }),
  }),
});

export const { useGetAllProductsQuery } = apiSlice;

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
