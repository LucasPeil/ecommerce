const graphql = require('graphql');
const { UserResultType, UserType } = require('../User/type');
const User = require('../models/userModel');

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
  },
});

module.exports = { UserQueryType };
