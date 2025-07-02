const graphql = require('graphql');
const {
  ProductResultType,
  ProductType,
  ProductConnectionType,
  GeneralReturnType,
  PriceRangeType,
  FilterType,
} = require('../Produto/type');
const Produto = require('../models/produtoModel');
const { errorTypes } = require('../errorHandler/constants');
const { filterFunction } = require('../utils/filterFunction');
const mongoose = require('mongoose');
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
      type: ProductConnectionType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        first: { type: graphql.GraphQLInt },
        after: { type: graphql.GraphQLString },
        filter: { type: FilterType },
        searchText: { type: graphql.GraphQLString },
      },
      resolve: async (_, { first, after, filter, searchText }) => {
        try {
          const filterResult = filterFunction(filter, searchText);

          // Decodificar o cursor 'after' para obter o ID inicial
          let startId = null;
          const limit = first || 5;
          if (after) {
            startId = Buffer.from(after, 'base64').toString('utf-8');
          }

          // Construir o filtro para buscar produtos após o cursor
          let query = startId && {
            _id: { $gt: new mongoose.Types.ObjectId(startId) },
          };

          let products = await Produto.aggregate([
            { $match: { ...query, ...filterResult } },
            { $sort: { _id: 1 } },
            { $limit: limit },
          ]);
          console.log(products);
          // Construir os edges
          const edges = products.slice(0, limit).map((product) => ({
            node: product,
            cursor: Buffer.from(product._id.toString()).toString('base64'), // Codificar o ID em base64
          }));

          // Retornar os dados no formato esperado

          return {
            edges,
            pageInfo: {
              hasNextPage: products.length >= limit,
              endCursor:
                edges.length > 0 ? edges[edges.length - 1].cursor : null,
            },
          };
        } catch (error) {
          throw new Error(errorTypes.SERVER_ERROR.message);
        }
      },
    },

    getRooms: {
      type: GeneralReturnType,
      args: {},
      resolve: async () => {
        try {
          const rooms = await Produto.distinct('category');

          return { status: 200, message: 'Sucesso!', data: rooms };
        } catch (error) {
          return { status: 500, message: 'Erro ao buscar cômodos' };
        }
      },
    },
    getPricesRange: {
      type: PriceRangeType,
      args: {},
      resolve: async () => {
        try {
          const priceDistribution = await Produto.aggregate([
            {
              $bucket: {
                groupBy: '$price',
                boundaries: [1, 30, 100, 500, 800, 10000],
                default: '10000+',
                output: {
                  count: { $sum: 1 },
                  /*  produtos: { $push: '$_id' }, */
                },
              },
            },
          ]);

          let pricesRange = [];
          for (let i = 0; i < priceDistribution.length; i += 2) {
            if (i == priceDistribution.length - 1) {
              // se for o último elemento
              pricesRange.push({
                price: `${priceDistribution[i]._id}`,
                qty: priceDistribution[i].count,
              });
            } else {
              pricesRange.push({
                price: `${priceDistribution[i]._id} - ${
                  priceDistribution[i + 1]._id
                }`,
                qty:
                  priceDistribution[i].count + priceDistribution[i + 1].count,
              });
            }
          }

          return {
            status: 200,
            message: 'Sucesso!',
            data: pricesRange,
          };
        } catch (error) {
          return { status: 500, message: 'Erro ao buscar preços' };
        }
      },
    },
  },
});

module.exports = { ProductQueryType };
