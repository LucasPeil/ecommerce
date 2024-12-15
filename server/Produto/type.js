const graphql = require('graphql');

const ProductType = new graphql.GraphQLObjectType({
  name: 'Product',
  fields: {
    id: { type: graphql.GraphQLString },
    category: { type: graphql.GraphQLString },
    name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    images: { type: new graphql.GraphQLList(graphql.GraphQLString) },
    description: { type: graphql.GraphQLString },
    price: { type: new graphql.GraphQLNonNull(graphql.GraphQLFloat) },
    available: { type: graphql.GraphQLBoolean },
    quantity: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
    comments: { type: new graphql.GraphQLList(graphql.GraphQLString) },
  },
});

const ProductResultType = new graphql.GraphQLObjectType({
  name: 'ProductResult',
  fields: {
    status: { type: graphql.GraphQLInt },
    message: { type: graphql.GraphQLString },
    data: { type: ProductType },
    dataList: { type: new graphql.GraphQLList(ProductType) },
  },
});

const ProductInput = new graphql.GraphQLInputObjectType({
  name: 'ProductInput',
  fields: {
    id: { type: graphql.GraphQLString },
    category: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    images: { type: new graphql.GraphQLList(graphql.GraphQLString) },
    name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    description: { type: graphql.GraphQLString },
    price: { type: new graphql.GraphQLNonNull(graphql.GraphQLFloat) },
    available: { type: graphql.GraphQLBoolean },
    quantity: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
  },
});

const ProductConnectionType = new graphql.GraphQLObjectType({
  name: 'ProductConnection',
  fields: {
    edges: {
      type: new graphql.GraphQLList(
        new graphql.GraphQLObjectType({
          name: 'ProductEdge',
          fields: {
            node: { type: ProductType },
            cursor: { type: graphql.GraphQLString },
          },
        })
      ),
    },
    pageInfo: {
      type: new graphql.GraphQLObjectType({
        name: 'PageInfo',
        fields: {
          hasNextPage: { type: graphql.GraphQLBoolean },
          hasPreviousPage: { type: graphql.GraphQLBoolean },
          startCursor: { type: graphql.GraphQLString },
          endCursor: { type: graphql.GraphQLString },
        },
      }),
    },
  },
});

module.exports = {
  ProductType,
  ProductResultType,
  ProductInput,
  ProductConnectionType,
};
