import { request, ClientError } from 'graphql-request';

export const graphqlBaseQuery =
  ({ baseUrl }) =>
  async ({ url, body, variables = null, requestHeaders = {} }) => {
    try {
      if (
        requestHeaders.authorization &&
        requestHeaders.authorization.includes('undefined')
      ) {
        console.warn(
          '⛔ Tentativa de envio de token inválido bloqueada no frontend.'
        );
        // Retorna um erro amigável sem bater no servidor
        return { error: { status: 401, data: 'Token not ready yet' } };
      }

      const fullUrl = baseUrl + url;
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
