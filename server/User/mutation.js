var graphql = require('graphql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserResultType, UserInput } = require('../User/type');
const User = require('../models/userModel');
const { errorTypes } = require('../errorHandler/constants');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};
const createNewPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
const UserMutation = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserResultType, // Tipo de saída (Output Type) para o retorno
      // `args` describes the arguments that the `user` query accepts
      args: { user: { type: UserInput } }, // Tipo de entrada (Input Type) para os argumentos
      resolve: async (_, { user }) => {
        try {
          const newUser = await User.create({
            ...user,
            ...{ password: await createNewPassword(user.password) },
          });

          /*  delete user.password; */

          return {
            status: 201,
            message: 'Usuário criado com sucesso!',
            data: {
              ...user,
              ...{
                token: generateToken(newUser._id.toString()),
                cart: [],
                orders: [],
              },
            },
          };
        } catch (error) {
          console.log(error);
          return { status: 500, message: 'Erro ao criar usuário' };
        }
      },
    },
    login: {
      type: UserResultType, // Tipo de saída (Output Type) para o retorno
      // `args` describes the arguments that the `user` query accepts
      args: { user: { type: UserInput } }, // Tipo de entrada (Input Type) para os argumentos
      resolve: async (_, { user: userData }) => {
        const { email, password } = userData;

        const user = await User.findOne({ email: email }).lean();
        if (user && (await bcrypt.compare(password, user.password))) {
          return {
            status: 200,
            message: 'Usuário logado',
            data: {
              _id: user._id,
              email: user.email,
              username: user.username,

              token: generateToken(user._id),
            },
          };
        } else {
          /*  throw new Error('Usuário ou senha inválidos'); */
          return { status: 401, message: 'Usuário ou senha inválidos' };
        }
      },
    },
    updateUser: {
      type: UserResultType, // Tipo de saída (Output Type) para o retorno
      // `args` describes the arguments that the `user` query accepts
      args: { user: { type: UserInput }, id: { type: graphql.GraphQLString } }, // Tipo de entrada (Input Type) para os argumentos
      resolve: async (_, { id, user }) => {
        try {
          const updatedUser = await User.findByIdAndUpdate(id, user, {
            new: true,
          });
          if (!updatedUser) {
            throw new Error('Usuário nao encontrado');
          }
          return {
            status: 200,
            message: 'Usuário atualizado com sucesso!',
            data: updatedUser,
          };
        } catch (error) {
          throw new Error(errorTypes.SERVER_ERROR);
        }
      },
    },
    deleteUser: {
      type: graphql.GraphQLString,
      // `args` describes the arguments that the `user` query accepts
      args: { id: { type: graphql.GraphQLString } },
      resolve: async (_, { id }) => {
        try {
          await User.findByIdAndDelete(id);
          return id;
        } catch (error) {
          return null;
        }
      },
    },
    updateUserCart: {
      type: UserResultType, // Tipo de saída (Output Type) para o retorno
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLString },
        productId: { type: graphql.GraphQLString },
        action: { type: graphql.GraphQLString },
        qty: { type: graphql.GraphQLInt },
      }, // Tipo de entrada (Input Type) para os argumentos
      resolve: async (_, { id, productId, action, qty }) => {
        try {
          const user = await User.findById(id);

          if (!user) {
            throw new Error('Usuário nao encontrado');
          }
          switch (action) {
            case 'add':
              user.cart.push({ _id: productId, qty });
              break;
            case 'remove':
              user.cart = user.cart.filter((item) => item._id != productId);
              break;
            case 'remove_all':
              user.cart = [];
              break;
            case 'update_qty':
              let itemIdxToChange = user.cart.findIndex(
                (item) => item._id == productId
              );
              user.cart[itemIdxToChange].qty = qty;

              break;

            default:
              break;
          }

          await user.save();
          return {
            status: 200,
            message: 'Usuário atualizado com sucesso!',
            data: user,
          };
        } catch (error) {
          throw new Error(errorTypes.SERVER_ERROR.message);
        }
      },
    },
  },
});
module.exports = { UserMutation };
