const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const { buildSchema } = require('graphql');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
// require('./config/db');
const PORT = process.env.PORT || 4000;
// Query para pegar todos os produtos

const productSchema = buildSchema(`

  type Product{
    id: ID!
    image: String
    descricao: String
    preco: Float
    disponibilidade: Boolean
    qtdDisponibilidade: Int
  }
  
  input ProductInput{
    image: String
    descricao: String
    preco: Float
    disponibilidade: Boolean
    qtdDisponibilidade: Int
  }

    type Query {
    getProduct(id: String!): Product
    getAllProducts(start: Int, end:Int, page:Int, search:String, checkbox: [String] ): [Product]
    deleteProduct(id: String!): ID
    createProduct(product: ProductInput): Product
    updateProduct(id:ID!, product: ProductInput): Product
    }
  `);

class Product {
  constructor(
    id,
    { image, descricao, preco, disponibilidade, qtdDisponibilidade }
  ) {
    this.id = id;
    this.image = image;
    this.descricao = descricao;
    this.preco = preco;
    this.disponibilidade = disponibilidade;
    this.qtdDisponibilidade = qtdDisponibilidade;
  }
  getProduct({ id }) {
    const produto = {
      id: id,
      image: 'image-url',
      descricao: 'Exemplo de Produto',
      preco: 19.99,
      disponibilidade: true,
      qtdDisponibilidade: 10,
    };

    return produto;
  }
}

const root = {
  getProduct({ id }) {
    return new Product(id, {
      image: 'image-url',
      descricao: 'Exemplo de Produto',
      preco: 19.99,
      disponibilidade: true,
      qtdDisponibilidade: 10,
    });
  },
};

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    extended: false,
    parameterLimit: 100000,
    limit: '50mb',
  })
);
app.all('/teste', createHandler({ schema: productSchema, rootValue: root }));

app.listen(PORT, () => console.log('Server running on port', PORT));
