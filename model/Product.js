const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    SKU: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    images: { type: Array },
    categories: { type: Array },
    tags: { type: Array },
    price: { type: Number, required: true },
    dicountPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
