import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: String,
  brand: String,
  price: Number,
  description: String,
  category: String,
  stock: Number,
  status: Boolean,
  thumbnails: Array,
});

export const productModel = model("product", productSchema);
