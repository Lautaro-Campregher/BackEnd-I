import { Router } from "express";
import { productModel } from "../models/products.model.js";

const router = Router();

router.get("/form", (req, res) => {
  res.render("products-form", {
    styles: "/css/form.css",
  });
});

router.get("/", async (req, res, next) => {
  try {
    const products = await productModel.find({}).lean();
    console.log(products);
    res.render("products", {
      products,
      message: "Catalogo de Productos",
      styles: "/css/products.css",
    });
  } catch (error) {}
});
export default router;
