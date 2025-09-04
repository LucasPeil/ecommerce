const { expressjwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const axios = require('axios');
const User = require('../models/userModel');
const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_AUDIENCE}.well-known/jwks.json`,
  }),
  audience: 'https://ecommerce-api',
  issuer: process.env.AUTH0_AUDIENCE,
  algorithms: ['RS256'],
  credentialsRequired: false,
});

const createUserInMongoDb = async (req, res, next) => {
  try {
    let user;
    if (!req.auth) {
      return next(); // rota pública
    }
    const token = req.headers.authorization?.split(' ')[1];
    const userInfo = await axios.get(process.env.AUTH0_AUDIENCE + 'userinfo', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (userInfo?.data) {
      const { sub, email, name } = userInfo?.data;

      user = await User.findOne({ auth0Id: sub /* auth0id: sub */ });
      console.log(user);
      if (!user) {
        user = await User.create({
          auth0Id: sub,
          username: name,
          email,
        });
      }
      req.user = user;
      next();
    }
  } catch (error) {
    console.error('Erro ao criar/verificar usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

module.exports = { checkJwt, createUserInMongoDb };
