const graphql = require('graphql');
const { ProductResultType, ProductType } = require('../Produto/type');
const Produto = require('../models/produtoModel');

const ProductQueryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    getProduct: {
      type: ProductResultType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLString },
      },
      resolve: async (_, { id }, context) => {
        try {
          console.log(context);
          const product = await Produto.findById(id);
          if (!product) {
            return { status: 404, message: 'Produto não encontrado' };
          }
          return { status: 200, message: 'Sucesso!', data: product };
        } catch (error) {
          return { status: 500, message: 'Erro ao buscar produto' };
        }
      },
    },

    getAllProducts: {
      type: ProductResultType /*  new graphql.GraphQLList(ProductResultType) */,
      // `args` describes the arguments that the `user` query accepts
      args: {},
      resolve: async () => {
        try {
          const products = await Produto.find();
          return { status: 200, message: 'Sucesso!', dataList: products };
          /*   return products.map((product) => ({
            status: 200,
            message: 'Sucesso!',
            data: product,
          })); */
        } catch (error) {
          return { status: 500, message: 'Erro ao buscar produtos' };
        }
      },
    },
  },
});

module.exports = { ProductQueryType };
