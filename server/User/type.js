const graphql = require('graphql');

const UserType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    username: { type: graphql.GraphQLString },
    email: { type: graphql.GraphQLString },
    resetPassword: { type: graphql.GraphQLBoolean },
    password: { type: graphql.GraphQLString },
  },
});

const UserResultType = new graphql.GraphQLObjectType({
  name: 'UserResult',
  fields: {
    status: { type: graphql.GraphQLInt },
    message: { type: graphql.GraphQLString },
    data: { type: ProductType },
  },
});

const UserInput = new graphql.GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    username: { type: graphql.GraphQLString },
    email: { type: graphql.GraphQLString },
    password: { type: graphql.GraphQLString },
  },
});
module.exports = { UserType, UserResultType, UserInput };
