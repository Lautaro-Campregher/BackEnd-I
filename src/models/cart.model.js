import { Schema, model, Types } from "mongoose";

const cartSchema = new Schema({
  products: [
    {
      product: {
        type: Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

export const cartModel = model("cart", cartSchema);
