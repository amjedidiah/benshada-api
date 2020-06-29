const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductsSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    mainMaterial: {
      type: String,
      required: true,
    },
    productionCountry: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    guarantee: {
      type: Number,
      required: true,
    },
    shop: {
      ref: "Shops",
      type: Schema.Types.ObjectId,
    },
    reviews: [
      {
        ref: "Reviews",
        type: Schema.Types.ObjectId,
      },
    ],
    category: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "unisex"],
    },
    quantity: {
      type: Number,
      default: 0,
    },
    image: [
      {
        type: String,
      },
    ],
    sizes: [
      {
        type: String,
      },
    ],
    overallRating: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: true,
    },
    returns: {
      type: Number,
      default: 0,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    batchQuality: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      default: false,
      type: Boolean,
    },
    isDeleted: {
      default: false,
      type: Boolean,
    },
    isBatch: {
      default: false,
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", ProductsSchema);
