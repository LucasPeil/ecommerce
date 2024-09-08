const graphql = require('graphql');

const ProductType = new graphql.GraphQLObjectType({
  name: 'Product',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    image: { type: graphql.GraphQLString },
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
    image: { type: graphql.GraphQLString },
    name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    description: { type: graphql.GraphQLString },
    price: { type: new graphql.GraphQLNonNull(graphql.GraphQLFloat) },
    available: { type: graphql.GraphQLBoolean },
    quantity: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
  },
});
module.exports = { ProductType, ProductResultType, ProductInput };
