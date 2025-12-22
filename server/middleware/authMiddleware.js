const { expressjwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const axios = require('axios');
const User = require('../models/userModel');
const getIssuerUrl = (domain) => {
  return domain.endsWith('/') ? domain : `${domain}/`;
};
const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: getIssuerUrl(process.env.AUTH0_ISSUER_BASE_URL),
  algorithms: ['RS256'],
  credentialsRequired: false,
  requestProperty: 'user',
});

const createUserInMongoDb = async (req, res, next) => {
  try {
    let user
     if (!req.headers.authorization) {
      return next(); // rota pública
    }
   
   token = req.headers.authorization?.split(' ')[1];
  
  //  AUTH0_ISSUER_BASE_URL
   const userInfo = await axios.get(process.env.AUTH0_ISSUER_BASE_URL + 'userinfo', {
     headers: { Authorization: `Bearer ${token}` },
    });
   
   if (userInfo?.data) {
      const { sub, email, name } = userInfo?.data;

      user = await User.findOne({ auth0Id: sub  });
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
    console.error('Erro ao criar/verificar usuário:', error.message);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

module.exports = { checkJwt, createUserInMongoDb };
