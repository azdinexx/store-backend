const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Editor: Number,
      Admin: Number,
    },
    pwd: {
      type: String,
      required: true,
    },
    fullName: { type: String },
    PhoneNumber: { type: String },
    BillingAddress: { type: String },
    ShippingAddress: { type: String },
    refreshToken: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
