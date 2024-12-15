var graphql = require('graphql');
const {
  ProductResultType,
  ProductType,
  ProductInput,
} = require('../Produto/type');
const Produto = require('../models/produtoModel');
const { uploadImages } = require('./fileUpload');

const ProductMutation = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createProduct: {
      type: ProductResultType, // Tipo de saída (Output Type) para o retorno
      // `args` describes the arguments that the `user` query accepts
      args: { product: { type: ProductInput } }, // Tipo de entrada (Input Type) para os argumentos
      resolve: async (_, { product }) => {
        try {
          const newProduct = new Produto(product);
          await newProduct.save();
          /*  if (req.files) {
            let urls = [];
            for (const key of Object.keys(req.files)) {
              try {
                const url = await uploadImages(
                  req.files[key].tempFilePath,
                  {},
                  'teste_' + tempFilePath
                );
                urls.push(url);
              } catch (error) {
                console.log(error);
                res.status(400);
                throw new Error('Erro ao salvar imagens.');
              }
            }
            
          } */

          return {
            status: 201,
            message: 'Produto criado com sucesso!',
            data: newProduct,
          };
        } catch (error) {
          console.log(error);
          return { status: 500, message: 'Erro ao criar produto' };
        }
      },
    },
    updateProduct: {
      type: ProductResultType, // Tipo de saída (Output Type) para o retorno
      // `args` describes the arguments that the `user` query accepts
      args: { product: { type: ProductInput } }, // Tipo de entrada (Input Type) para os argumentos
      resolve: async (_, { id, product }) => {
        try {
          const updatedProduct = await Produto.findByIdAndUpdate(id, product, {
            new: true,
          });
          if (!updatedProduct) {
            return { status: 404, message: 'Produto não encontrado' };
          }
          return {
            status: 200,
            message: 'Produto atualizado com sucesso!',
            data: updatedProduct,
          };
        } catch (error) {
          return { status: 500, message: 'Erro ao atualizar produto' };
        }
      },
    },
    deleteProduct: {
      type: graphql.GraphQLString,
      // `args` describes the arguments that the `user` query accepts
      args: { id: { type: graphql.GraphQLString } },
      resolve: async (_, { id }) => {
        try {
          await Produto.findByIdAndDelete(id);
          return id;
        } catch (error) {
          return null;
        }
      },
    },
  },
});
module.exports = { ProductMutation };
