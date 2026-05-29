import { Router, json, urlencoded } from "express";
import ProductManager from "../dao/ProductManager.js";

const router = Router();

//Mal puesto, a revisar
router.use(json(), urlencoded({ extended: true }));

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

router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    if (req.body.status == "on") {
      req.body.status = true;
    } else {
      req.body.status = false;
    }
    const newProduct = await ProductManager.createdProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

export default router;
