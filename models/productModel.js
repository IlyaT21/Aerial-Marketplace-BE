const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productImage: {
      type: String, // URL or path to the image
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: false,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      required: false,
    },
    registration: {
      type: String,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
