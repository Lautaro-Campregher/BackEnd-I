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

router.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    console.log(pid);
    const requiredProduct = await ProductManager.getProductById(pid);
    res.status(202).json(requiredProduct);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
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

router.put("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const update = req.body;
    const product = await ProductManager.updateProductById(pid, update, {
      new: true,
    });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await ProductManager.deleteProductById(pid);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

export default router;
