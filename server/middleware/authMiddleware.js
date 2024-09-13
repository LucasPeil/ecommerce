const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

const protect = asyncHandler(async (req) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verifica o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user id from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        throw new Error('Não autorizado');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  /*  if (!token) {
    throw new Error('No token');
  } */
});

// Trabalhar numa maneira de permitir que o recrutador tenha um user 'temporario'
const protectRecruiter = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verifica o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user id from token
      req.user = await User.findById(decoded.id).select('-password');

      // Encaminha o request somente se usuário for admin
      if (req.user.admin) {
        next();
      } else {
        res.status(401);
        throw new Error('Não autorizado');
      }
    } catch (error) {
      res.status(401);
      throw new Error('Não autorizado');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('No token');
  }
});

module.exports = { protect, protectRecruiter };
