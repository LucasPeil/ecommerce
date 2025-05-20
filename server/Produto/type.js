const graphql = require('graphql');
const { GraphQLScalarType, Kind } = require('graphql');
const ProductType = new graphql.GraphQLObjectType({
  name: 'Product',
  fields: {
    _id: { type: graphql.GraphQLString },
    category: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    images: { type: new graphql.GraphQLList(graphql.GraphQLString) },
    description: { type: graphql.GraphQLString },
    price: { type: graphql.GraphQLFloat },
    available: { type: graphql.GraphQLBoolean },
    quantity: { type: graphql.GraphQLInt },
    qtySelected: { type: graphql.GraphQLInt },
    comments: { type: new graphql.GraphQLList(graphql.GraphQLString) },
  },
});
const FilterType = new graphql.GraphQLInputObjectType({
  name: 'FilterType',
  fields: {
    prices: { type: new graphql.GraphQLList(graphql.GraphQLString) },
    rooms: { type: new graphql.GraphQLList(graphql.GraphQLString) },
    disponibility: { type: new graphql.GraphQLList(graphql.GraphQLString) },
  },
});
const PriceMixedScalar = new GraphQLScalarType({
  name: 'PriceMixedScalar',
  description: 'Scalar that can be either a String or an Int',
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return value;
  },
  parseLiteral(ast) {
    if (
      ast.kind === Kind.STRING ||
      ast.kind === Kind.INT ||
      ast.kind === Kind.FLOAT
    ) {
      return ast.value;
    }
    return null;
  },
});
const PriceDataType = new graphql.GraphQLObjectType({
  name: 'PriceDataType',
  fields: {
    price: { type: graphql.GraphQLString },
    qty: { type: graphql.GraphQLInt },
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
    _id: { type: graphql.GraphQLString },
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
const GeneralReturnType = new graphql.GraphQLObjectType({
  name: 'GeneralReturnType',
  fields: {
    status: { type: graphql.GraphQLInt },
    message: { type: graphql.GraphQLString },
    data: { type: new graphql.GraphQLList(graphql.GraphQLString) },
  },
});

const PriceRangeType = new graphql.GraphQLObjectType({
  name: 'PriceRangeType',
  fields: {
    status: { type: graphql.GraphQLInt },
    message: { type: graphql.GraphQLString },
    data: { type: new graphql.GraphQLList(PriceDataType) },
  },
});
module.exports = {
  ProductType,
  ProductResultType,
  ProductInput,
  ProductConnectionType,
  GeneralReturnType,
  PriceRangeType,
  FilterType,
};
