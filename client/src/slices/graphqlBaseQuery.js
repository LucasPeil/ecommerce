import { request, gql, ClientError } from 'graphql-request';

export const graphqlBaseQuery =
  ({ baseUrl }) =>
  async ({ url, body }) => {
    try {
      const fullUrl = baseUrl + url;

      const result = await request(fullUrl, body);

      return { data: result };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error } };
      }
      return { error: { status: 500, data: error } };
    }
  };
