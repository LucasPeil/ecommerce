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
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
connectDB();

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
// 2. Rota para criar o PaymentIntent do Stripe
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { items, email } = req.body;

    const calculateOrderAmount = (items) => {
      //R$ 1 fixo para teste.
      return 100;
    };
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'brl',
      // Habilita métodos automáticos (Cartão, Boleto, PIX, etc, configurados no Dashboard)
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        email_cliente: email, // O email que capturamos no frontend
        integration_check: 'portfolio_checkout',
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Erro no Stripe:', error);
    res.status(500).send({ error: error.message });
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
