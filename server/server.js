const express = require('express');

const { createHandler } = require('graphql-http/lib/use/express');
const graphql = require('graphql');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const { ProductQueryType } = require('./Produto/query');
const { ProductMutation } = require('./Produto/mutation');
const { UserMutation } = require('./User/mutation');
const fileUpload = require('express-fileupload');
const { UserQueryType } = require('./User/query');
const { uploadImages } = require('./Produto/fileUpload');
const PORT = process.env.PORT || 4000;
const { v4: uuidv4 } = require('uuid');
const {
  checkJwt,
  createUserInMongoDb,
} = require('./middleware/authMiddleware');

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
      const url = await uploadImages(req.files[key].tempFilePath, {}, uuidv4());

      urls.push(url);
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error('Erro ao salvar imagens.');
    }
  }

  if (urls.length > 0) {
    res.status(200).json(urls);
  } else {
    res.status(400);
    throw new Error('Erro ao salvar imagens.');
  }
});
app.all(
  '/api/products',
  checkJwt,
  createUserInMongoDb,
  createHandler({
    schema: productSchema,
    formatError: (err) => {
      return err;
    },

    context: async (req) => ({
      /*   filesObj: req?.files, */
      user: req.user || null,
    }),
  })
);

app.all(
  '/api/users',
  checkJwt,
  createUserInMongoDb,
  createHandler({
    schema: userSchema,
    formatError: (err) => {
      return err;
    },
    context: async (req) => {
      return { user: req.user || null };
    },
  })
);

app.listen(PORT, () => console.log('Server running on port', PORT));
