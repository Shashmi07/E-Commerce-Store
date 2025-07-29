const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  inStock: { type: Boolean, default: true },
  image: { type: String }, // Store image URL/path here
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
