import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlBaseQuery } from './graphqlBaseQuery';
import { gql } from 'graphql-request';

export const getUser = () => JSON.parse(localStorage.getItem('user#19dg23'));
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: graphqlBaseQuery({
    baseUrl: 'http://localhost:3100/api',
  }),
  tagTypes: ['DeleteProduct','CreateProduct'],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ first, after, filter, sort, searchText }) => {
        return {
          url: '/products',
          body: gql`
            query getAllProducts(
              $first: Int
              $after: String
              $filter: FilterType
              $searchText: String
              $sort: String
            ) {
              getAllProducts(
                first: $first
                after: $after
                filter: $filter
                searchText: $searchText
                sort: $sort
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
                  endCursor
                }
              }
            }
          `,
          variables: {
            first,
            after,
            filter,
            searchText,
            sort,
          },
        };
      },
      providesTags: ['CreateProduct'],
      transformResponse: (response) => {
        return response.getAllProducts;
      },
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
      query:  ({ product, token }) => {
        return {
          url: '/products',
          body: gql`
            mutation createProduct($product: ProductInput!) {
              createProduct(product: $product) {
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
            product,
          },
           
          requestHeaders: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['CreateProduct'],
      transformResponse: (response) => response.createProduct,
    }),
    getRooms: builder.query({
      query: () => {
        return {
          url: '/products',
          body: gql`
            query getRooms {
              getRooms {
                status
                message
                data
              }
            }
          `,
        };
      },
      transformResponse: (response) => response.getRooms,
    }),
    getPricesRange: builder.query({
      query: () => {
        return {
          url: '/products',
          body: gql`
            query getPricesRange {
              getPricesRange {
                status
                message
                data {
                  price
                  qty
                }
              }
            }
          `,
        };
      },
      transformResponse: (response) => response.getPricesRange,
    }),
    // USER QUERIES
    /*  createUser: builder.mutation({
      query: (user) => {
        return {
          url: '/users',
          body: gql`
            mutation createUser($user: UserInput!) {
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
    }), */
    /*  login: builder.mutation({
      query: (user) => {
        return {
          url: '/users',
          body: gql`
            mutation login($user: UserInput!) {
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
        localStorage.setItem(
          'user#19dg23',
          JSON.stringify(response?.login?.data)
        );
        return response.login;
      },
    }), */
    getUser: builder.query({
      query: ({ email, token }) => {
        return {
          url: '/users',
          body: gql`
            query getUser($email: String) {
              getUser(email: $email) {
                status
                message
                data {
                  _id
                  username
                  email
                  cart {
                    _id
                    name
                    images
                    description
                    price
                    qtySelected
                    quantity
                    available
                  }
                }
              }
            }
          `,
          variables: {
            email,
          },
          requestHeaders: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        };
      },
      transformResponse: (response) => response.getUser?.data,
    }),

    getUserCart: builder.query({
      query: ({ id, token }) => {
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
                    _id
                    name
                    images
                    description
                    price
                    qtySelected
                    quantity
                    available
                  }
                }
              }
            }
          `,
          variables: {
            id,
          },
          requestHeaders: {
            // 'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ['DeleteProduct'],
      transformResponse: (response) => response.getUserCart?.data,
    }),

    updateUserCart: builder.mutation({
      query: ({ id, productId, action, qty, token }) => {
        return {
          url: '/users',
          body: gql`
            mutation updateUserCart(
              $id: String!
              $productId: String
              $action: String!
              $qty: Int
            ) {
              updateUserCart(
                productId: $productId
                id: $id
                action: $action
                qty: $qty
              ) {
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
            qty,
          },
          requestHeaders: {
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
          },
        };
      },
      invalidatesTags: ['DeleteProduct'],
      transformResponse: (response) => response?.updateUserCart?.data,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  /*   useCreateUserMutation,
  useLoginMutation, */
  useGetUserCartQuery,
  useUpdateUserCartMutation,
  useGetRoomsQuery,
  useGetPricesRangeQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
} = apiSlice;
