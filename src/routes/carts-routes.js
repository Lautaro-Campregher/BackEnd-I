import { Router, json, urlencoded } from "express";
import CartManager from "../dao/CartManager.js";
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/products.model.js";

const router = Router();

router.use(json(), urlencoded({ extended: true }));

router.post("/", async (req, res, next) => {
  try {
    const newCart = await cartModel.create({ products: [] });
    res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
});

router.get("/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const requiredCart = await cartModel
      .findById(cid)
      .populate("products.product");
    if (!requiredCart) {
      return res.status(404).json({
        message: "Carrito no encontrado",
      });
    }
    res.status(202).json(requiredCart);
  } catch (error) {
    next(error);
  }
});

router.post("/:cid/products/:pid", async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const requiredCart = await cartModel.findById(cid);
    const requieredProduct = await productModel.findById(pid);

    if (!requiredCart) {
      return res.status(404).json({
        message: "Carrito no encontrado",
      });
    }

    if (!requieredProduct) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    const existingProduct = requiredCart.products.find((item) =>
      item.product.equals(pid),
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      requiredCart.products.push({
        product: pid,
        quantity: 1,
      });
    }

    await requiredCart.save();

    await requiredCart.populate("products.product");

    res.status(201).json(requiredCart);
  } catch (error) {
    next(error);
  }
});

export default router;
