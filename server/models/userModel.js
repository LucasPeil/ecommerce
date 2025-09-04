const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    auth0Id: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    /*  password: {
      type: String,
      required: true,
    }, */
    orders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Order',
      required: false,
      default: [],
    },
    cart: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Produto', // Referência para o modelo Produto
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
