import { Router, json, urlencoded } from "express";
import CartManager from "../dao/CartManager.js";

const router = Router();

router.use(json(), urlencoded({ extended: true }));

router.post("/", async (req, res, next) => {
  try {
    const newCart = await CartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
});

router.get("/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const requiredCart = await CartManager.getCartById(cid);
    res.status(202).json(requiredCart);
  } catch (error) {
    next(error);
  }
});

router.post("/:cid/products/:pid", async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const requiredCart = await CartManager.addProductToCart(cid, pid);
    res.status(201).json(requiredCart);
  } catch (error) {
    next(error);
  }
});

export default router;
