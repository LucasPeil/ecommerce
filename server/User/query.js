const graphql = require('graphql');
const { UserResultType, UserType } = require('../User/type');
const User = require('../models/userModel');
const { errorTypes } = require('../errorHandler/constants');

const UserQueryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    getUser: {
      type: UserResultType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLString },
      },
      resolve: async (_, { id }) => {
        try {
          const user = await User.findById(id);
          if (!user) {
            return { status: 404, message: 'Usuário não encontrado' };
          }
          return { status: 200, data: user };
        } catch (error) {
          return { status: 500, message: 'Erro ao buscar usuário' };
        }
      },
    },
    getUserCart: {
      type: UserResultType, // Tipo de saída (Output Type) para o retorno
      // `args` describes the arguments that the `user` query accepts
      args: { id: { type: graphql.GraphQLString } }, // Tipo de entrada (Input Type) para os argumentos
      resolve: async (_, { id }) => {
        try {
          if (id) {
            const user = await User.findOne({ _id: id }).populate('cart');

            if (!user) {
              throw new Error('Usuário nao encontrado');
            }
            return {
              status: 200,
              message: 'Informações do carrinho recuperadas com sucesso!',
              data: user,
            };
          }
        } catch (error) {
          throw new Error(errorTypes.SERVER_ERROR.message);
        }
      },
    },
  },
});

module.exports = { UserQueryType };
