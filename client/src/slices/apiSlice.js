import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlBaseQuery } from './graphqlBaseQuery';
import { gql } from 'graphql-request';
import { logout } from './user';

export const getUser = () => JSON.parse(localStorage.getItem('user'));
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
            query getAllProducts(
              $first: Int
              $after: String
              $searchText: String
            ) {
              getAllProducts(
                first: $first
                after: $after
                searchText: $searchText
              ) {
                edges {
                  node {
                    _id
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
          variables: {
            first,
            after,
            searchText, // Pode ser `null`, e o GraphQL lidará corretamente
          },
        };
      },
      transformResponse: (response) => response.getAllProducts,
    }),
    getProduct: builder.query({
      query: (id) => {
        return {
          url: '/products',
          body: gql`
            query getProduct($id: String!) {
              getProduct(id: $id) {
                status
                message
                data {
                  _id
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
          variables: {
            id,
          },
        };
      },
      transformResponse: (response) => response.getProduct.data,
    }),
    createProduct: builder.mutation({
      query: (product) => {
        return {
          url: '/products',
          body: gql`
          query  createProduct($product: ProductInput) { {
            createProduct(product: $product) {
              status
              message
              data {
                _id
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
          variables: {
            product,
          },
        };
      },
      transformResponse: (response) => response.createProduct,
    }),
    // USER QUERIES
    createUser: builder.mutation({
      query: (user) => {
        return {
          url: '/users',
          body: gql`
            mutation createUser($user: UserInput) {
              createUser(user: $user) {
                status
                message
                data {
                  _id
                  username
                  email
                  orders {
                    products {
                      name
                      images
                    }
                    total
                  }
                  cart {
                    name
                    images
                  }
                }
              }
            }
          `,
          variables: {
            user,
          },
          requestHeaders: {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        };
      },
      transformResponse: (response) => response.createUser,
    }),
    login: builder.mutation({
      query: (user) => {
        return {
          url: '/users',
          body: gql`
            mutation login($user: UserInput) {
              login(user: $user) {
                status
                message
                data {
                  _id
                  username
                  email
                }
              }
            }
          `,
          variables: {
            user,
          },
          requestHeaders: {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        };
      },
      transformResponse: (response) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response?.login?.data));
      },
    }),

    getUserCart: builder.query({
      query: ({ id }) => {
        return {
          url: '/users',
          body: gql`
            query getUserCart($id: String) {
              getUserCart(id: $id) {
                status
                message
                data {
                  _id
                  username
                  email
                  cart {
                    name
                    images
                  }
                }
              }
            }
          `,
          variables: {
            id,
          },
          requestHeaders: {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        };
      },
      transformResponse: (response) => response.getUserCart?.data,
    }),

    updateUserCart: builder.mutation({
      query: ({ id, productId, action }) => {
        return {
          url: '/users',
          body: gql`
            mutation updateUserCart(
              $id: String
              $productId: String
              $action: String
            ) {
              updateUserCart(productId: $productId, id: $id, action: $action) {
                status
                message
                data {
                  _id
                  username
                  email
                  orders {
                    products {
                      name
                      images
                    }
                    total
                  }
                  cart {
                    name
                    images
                  }
                }
              }
            }
          `,
          variables: {
            id,
            productId,
            action,
          },
          requestHeaders: {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        };
      },
      transformResponse: (response) => response?.updateUserCart?.data,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useCreateUserMutation,
  useLoginMutation,
  useGetUserCartQuery,
  useUpdateUserCartMutation,
} = apiSlice;

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
