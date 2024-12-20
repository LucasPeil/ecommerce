import { request, gql, ClientError } from 'graphql-request';

export const graphqlBaseQuery =
  ({ baseUrl }) =>
  async ({ url, body, variables = null, requestHeaders = {} }) => {
    try {
      const fullUrl = baseUrl + url;
      console.log(variables);
      const result = await request({
        url: fullUrl,
        document: body,
        variables,
        requestHeaders,
      });

      return { data: result };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error } };
      }
      return { error: { status: 500, data: error } };
    }
  };
