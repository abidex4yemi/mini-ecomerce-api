const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    summary: {
      totalPrice: {
        type: Number,
      },
    },
    expires: {
      type: Date,
    },
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = cartSchema;
