const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  resetPassword: {
    type: Boolean,
    required: false,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  orders: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Order',
    required: false,
    default: [],
  },
  cart: {
    type: [String],
    required: false,
    default: [],
  },
});

module.exports = mongoose.model('User', userSchema);
