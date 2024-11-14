const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const graphql = require('graphql');
const { buildSchema } = require('graphql');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const Produto = require('./models/produtoModel');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const { ProductQueryType } = require('./Produto/query');
const { ProductMutation } = require('./Produto/mutation');
const { UserMutation } = require('./User/mutation');

const { UserQueryType } = require('./User/query');
const { protect } = require('./middleware/authMiddleware');
const PORT = process.env.PORT || 4000;

connectDB();
// Query para pegar todos os produtos
/* const productSchema = buildSchema(`
  type Product{
    id: ID
    images: String
    description: String
    price: Float
    available: Boolean
    quantity: Int
    comments: [String]
  }

  type ProductResult {
    status: Int!
    message: String
    data: Product
    dataList: [Product]
}
  
  input ProductInput{
    images: String
    description: String
    price: Float
    available: Boolean
    quantity: Int
  }

    type Query {
    getProduct(id: String!): ProductResult
    getAllProducts(start: Int, end:Int, page:Int, search:String, checkbox: [String] ): [ProductResult]
    }

    type Mutation{
    deleteProduct(id: String!): ID
    createProduct(product: ProductInput): ProductResult
    updateProduct(id:ID!, product: ProductInput): ProductResult}
  `);
 */
class Product {
  constructor(
    id,
    { images, description, price, available, quantity, comments }
  ) {
    this.id = id;
    this.images = images;
    this.description = description;
    this.price = price;
    this.available = available;
    this.quantity = quantity;
    this.comments = comments;
  }
}
/* const root = {
  getProduct({ id }) {
    let product = new Product(id, {
      images: 'imageaaa-url',
      description: 'Exemplo de Produto',
      price: 19.99,
      available: true,
      quantity: 10,
    });
    return { status: 200, message: 'Sucesso!', data: product };
  },

  createProduct: async ({ product }, _, context) => {
    try {
      let newProduct = new Produto(product);
      await newProduct.save();
      return { status: 200, message: 'Sucesso!', data: newProduct };
    } catch (error) {
      console.log(error);
      return { status: 500, message: 'Erro ao criar produto' };
    }
  
  },
}; */
/* const root = {
  getProduct: async ({ id }) => {
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

  getAllProducts: async () => {
    try {
      const products = await Produto.find();
      return products.map((product) => ({
        status: 200,
        message: 'Sucesso!',
        data: product,
      }));
    } catch (error) {
      return { status: 500, message: 'Erro ao buscar produtos' };
    }
  },

  createProduct: async ({ product }) => {
    try {
      const newProduct = new Product(product);
      await newProduct.save();
      return {
        status: 201,
        message: 'Produto criado com sucesso!',
        data: newProduct,
      };
    } catch (error) {
      return { status: 500, message: 'Erro ao criar produto' };
    }
  },

  updateProduct: async ({ id, product }) => {
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

  deleteProduct: async ({ id }) => {
    try {
      await Produto.findByIdAndDelete(id);
      return id;
    } catch (error) {
      return null;
    }
  },
}; */
const productSchema = new graphql.GraphQLSchema({
  query: ProductQueryType,
  mutation: ProductMutation,
});
const userSchema = new graphql.GraphQLSchema({
  query: UserQueryType,
  mutation: UserMutation,
});
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    extended: false,
    parameterLimit: 100000,
    limit: '50mb',
  })
);
app.all(
  '/api/products',
  createHandler({
    schema: productSchema,
    context: async (req) => ({
      /*   user: await protect(req), */
      teste: 'Hello World',
    }),
  })
);

app.listen(PORT, () => console.log('Server running on port', PORT));
