const mongoose = require("mongoose");
const User = require("./user.model.js");
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      unique: false,
    },

    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      unique: false,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Product", productSchema);
