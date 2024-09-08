const mongoose = require('mongoose');

const commentschema = mongoose.Schema(
  {
    autor: { type: String },
    conteúdo: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    classificacao: { type: Number, required: true },
  },
  { timestamps: true }
);
const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    available: { type: Boolean, required: true },
    quantity: { type: Number, required: true },
    comments: { type: [commentschema], required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Produto', productSchema);
