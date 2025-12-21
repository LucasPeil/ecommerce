module.exports = {
  errorTypes: {
    BAD_REQUEST: { message: 'Requisição inválida', statusCode: 400 },
    UNAUTHORIZED: {
      message: 'Você não tem autorização para realizar esta ação.',
      statusCode: 401,
    },
    NOT_FOUND: {
      message: 'Não foi possível encontrar o recurso solicitado.',
      statusCode: 404,
    },
    SERVER_ERROR: { message: 'Erro interno do servidor', statusCode: 500 },
  },
};
