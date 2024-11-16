const graphql = require('graphql');
const {
  ProductResultType,
  ProductType,
  ProductConnectionType,
} = require('../Produto/type');
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
      type: ProductConnectionType /*  new graphql.GraphQLList(ProductResultType) */,
      // `args` describes the arguments that the `user` query accepts
      args: {
        first: { type: graphql.GraphQLInt },
        after: { type: graphql.GraphQLString },
      },
      resolve: async (_, { first = 5, after, search, checkbox }, context) => {
        try {
          console.log('testeee');
          // Decodificar o cursor 'after' para obter o ID inicial
          let startId = null;
          if (after) {
            startId = Buffer.from(after, 'base64').toString('utf-8');
          }
          // Construir o filtro para buscar produtos após o cursor
          const query = startId ? { _id: { $gt: startId } } : {};

          // Buscar os produtos no banco de dados
          const products = await Produto.find(query)
            .sort({ _id: 1 }) // Ordenar por ID em ordem crescente
            .limit(first + 1); // Buscar um a mais para verificar `hasNextPage`

          // Construir os edges
          const edges = products.slice(0, first).map((product) => ({
            node: product,
            cursor: Buffer.from(product._id.toString()).toString('base64'), // Codificar o ID em base64
          }));

          // Determinar os cursors de início e fim
          const startCursor = edges.length > 0 ? edges[0].cursor : null;
          const endCursor =
            edges.length > 0 ? edges[edges.length - 1].cursor : null;

          // Determinar se há mais páginas
          const hasNextPage = products.length > first;
          const hasPreviousPage = !!after; // Sempre haverá uma página anterior se o cursor `after` foi usado

          // Retornar os dados no formato esperado
          return {
            edges,
            pageInfo: {
              hasNextPage,
              hasPreviousPage,
              startCursor,
              endCursor,
            },
          };
        } catch (error) {
          return { status: 500, message: 'Erro ao buscar produtos' };
        }
      },
    },
  },
});

module.exports = { ProductQueryType };
