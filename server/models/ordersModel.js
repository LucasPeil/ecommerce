const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produto' }],
  total: { type: Number, required: true },
});

module.exports = mongoose.model('Order', ordersSchema);
