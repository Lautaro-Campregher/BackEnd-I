import { Router, json, urlencoded } from "express";
import CartManager from "../dao/CartManager.js";
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/products.model.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const newCart = await cartModel.create({ products: [] });
    res.status(201).json({ message: `Carrito ${newCart._id}creado con exito` });
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
    res.status(200).json(requiredCart);
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

router.put("/:cid/products/:pid", async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const requiredCart = await cartModel.findById(cid);
    if (!requiredCart) {
      return res.status(404).json({
        message: "Carrito no encontrado",
      });
    }

    const existingProduct = requiredCart.products.find((item) =>
      item.product.equals(pid),
    );

    if (!existingProduct) {
      return res.status(404).json({
        message: "Producto no encontrado en el carrito",
      });
    }

    const { quantity } = req.body;

    existingProduct.quantity = quantity;

    await requiredCart.save();
    res.status(200).json(requiredCart);
  } catch (error) {
    next(error);
  }
});

router.put("/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;

    const requiredCart = await cartModel.findById(cid);
    if (!requiredCart) {
      return res.status(404).json({
        message: "Carrito no encontrado",
      });
    }

    requiredCart.products = req.body.products;

    await requiredCart.save();
    res.status(200).json(requiredCart);
  } catch (error) {
    next(error);
  }
});

router.delete("/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const requiredCart = await cartModel.findById(cid);

    if (!requiredCart) {
      //Anlizar mas adelante si es factible un helper para validaciones//
      return res.status(404).json({
        message: "Carrito no encontrado",
      });
    }

    requiredCart.products = [];

    await requiredCart.save();
    res.status(200).json(requiredCart);
  } catch (error) {
    next(error);
  }
});

router.delete("/:cid/products/:pid", async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const requiredCart = await cartModel.findById(cid);
    if (!requiredCart) {
      return res.status(404);
    }

    requiredCart.products = requiredCart.products.filter(
      (item) => !item.product.equals(pid),
    );

    await requiredCart.save();
    res.status(200).json(requiredCart);
  } catch (error) {
    next(error);
  }
});

export default router;
