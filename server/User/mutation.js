var graphql = require('graphql');

const { UserResultType, UserInput } = require('../User/type');
const User = require('../models/userModel');

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

          return {
            status: 201,
            message: 'Usuário criado com sucesso!',
            data: newUser,
          };
        } catch (error) {
          return { status: 500, message: 'Erro ao criar usuário' };
        }
      },
    },
    login: {
      type: UserResultType, // Tipo de saída (Output Type) para o retorno
      // `args` describes the arguments that the `user` query accepts
      args: { user: { type: UserInput } }, // Tipo de entrada (Input Type) para os argumentos
      resolve: async (_, { user }) => {
        const { email, password } = user;
        try {
          const user = await User.findOne({ email: email }).lean();
          if (user && (await bcrypt.compare(password, user.password))) {
            res.status(201).json({
              _id: user._id,
              email: user.email,
              token: generateToken(user._id),
              resetPassword: user.resetPassword,
            });
          } else {
            throw new Error('Usuário ou senha inválidos');
          }
        } catch (error) {
          return { status: 401, message: 'Usuário ou senha inválidos' };
        }
      },
    },
    updateUser: {
      type: UserResultType, // Tipo de saída (Output Type) para o retorno
      // `args` describes the arguments that the `user` query accepts
      args: { user: { type: UserInput } }, // Tipo de entrada (Input Type) para os argumentos
      resolve: async (_, { id, user }) => {
        try {
          const updatedUser = await User.findByIdAndUpdate(id, product, {
            new: true,
          });
          if (!updatedUser) {
            return { status: 404, message: 'Usuário não encontrado' };
          }
          return {
            status: 200,
            message: 'Usuário atualizado com sucesso!',
            data: updatedUser,
          };
        } catch (error) {
          return { status: 500, message: 'Erro ao atualizar usuário' };
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
      args: { user: { type: UserInput } }, // Tipo de entrada (Input Type) para os argumentos
      resolve: async (_, { id, productId }) => {
        try {
          const user = await User.findById(id);

          if (!updatedUser) {
            return { status: 404, message: 'Usuário não encontrado' };
          }
          return {
            status: 200,
            message: 'Usuário atualizado com sucesso!',
            data: updatedUser,
          };
        } catch (error) {
          return { status: 500, message: 'Erro ao atualizar usuário' };
        }
      },
    },
  },
});
module.exports = { UserMutation };
