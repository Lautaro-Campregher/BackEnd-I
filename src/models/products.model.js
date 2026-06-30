import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  title: String,
  brand: String,
  price: Number,
  description: String,
  category: String,
  stock: Number,
  status: Boolean,
  thumbnails: Array,
});

productSchema.plugin(mongoosePaginate);

export const productModel = model("product", productSchema);
