import { Router, json, urlencoded } from "express";
import ProductManager from "../dao/ProductManager.js";

const router = Router();

//Mal puesto, a revisar
router.use(express.json(), express.urlencoded({ extended: true }));

router.get("/", async (req, res, next) => {
  try {
    const products = await ProductManager.getProducts();
    res.render("products", {
      products,
      message: "Catalogo de Productos",
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
