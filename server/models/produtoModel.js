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
    images: { type: [String] },
    description: { type: String },
    price: { type: Number, required: true },
    //  price: { type: mongoose.Types.Decimal128, required: true },
    available: { type: Boolean, default: true },
    quantity: { type: Number, required: true },
    comments: { type: [commentschema], required: false },
    category: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Produto', productSchema);
