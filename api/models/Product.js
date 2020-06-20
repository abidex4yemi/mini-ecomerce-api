const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    attributes: [
      {
        price: {
          type: Number,
          required: true,
        },
        imageUrl: {
          type: String,
        },
        sizes: [
          {
            type: String,
            required: true,
          },
        ],
        color: {
          type: String,
        },
        rating: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = productSchema;
