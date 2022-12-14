const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, maxLength: 300 },
    img: { type: String, required: true },
    categories: { type: Array },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    value: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
