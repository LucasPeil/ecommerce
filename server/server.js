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
const fileUpload = require('express-fileupload');
const { UserQueryType } = require('./User/query');
const { protect } = require('./middleware/authMiddleware');
const { uploadImages } = require('./Produto/fileUpload');
const PORT = process.env.PORT || 4000;

connectDB();
// Query para pegar todos os produtos
/* app.use(graphqlUploadExpress()); */

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
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    defCharset: 'utf8',
    defParamCharset: 'utf8',
    limits: { fileSize: 50 * 1024 * 1024 * 100 * 100 },
  })
);
app.post('/api/uploadFile', async (req, res) => {
  let urls = [];

  for (const key of Object.keys(req.files)) {
    try {
      const url = await uploadImages(req.files[key].tempFilePath, {}, '');
      console.log(url);
      urls.push(url);
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error('Erro ao salvar imagens.');
    }
  }
  console.log(urls);
  if (urls.length > 0) {
    res.status(200).json(urls);
  } else {
    res.status(400);
    throw new Error('Erro ao salvar imagens.');
  }
});
app.all(
  '/api/products',
  createHandler({
    schema: productSchema,
    context: async (req) => ({
      /*   user: await protect(req), */
      teste: 'Hello World',
      filesObj: req?.files,
    }),
  })
);

app.listen(PORT, () => console.log('Server running on port', PORT));
