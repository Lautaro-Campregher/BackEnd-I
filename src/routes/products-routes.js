import { Router, json, urlencoded } from "express";
import ProductManager from "../dao/ProductManager.js";
import { productModel } from "../models/products.model.js";
import { uploader } from "../utils.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await productModel.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const requiredProduct = await productModel.findById(pid);

    if (!requiredProduct) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }
    res.status(202).json(requiredProduct);
  } catch (error) {
    next(error);
  }
});

router.post("/", uploader.single("thumbnail"), async (req, res, next) => {
  try {
    req.body.status = req.body.status === "on";

    if (req.file) {
      req.body.thumbnails = [req.file.filename];
    }

    const newProduct = await productModel.create({ ...req.body });

    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.put("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const update = req.body;

    const product = await productModel.findOneAndUpdate({ code: pid }, update, {
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
    const product = await productModel.findOneAndDelete({ code: pid });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

export default router;
