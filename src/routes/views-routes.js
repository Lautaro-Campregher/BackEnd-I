import { Router } from "express";
import { productModel } from "../models/products.model.js";
import { cartModel } from "../models/cart.model.js";

const router = Router();

router.get("/", (req, res) => {
  res.redirect("/products");
});

router.get("/form", (req, res) => {
  res.render("products-form", {
    styles: "/css/form.css",
  });
});

router.get("/products", async (req, res, next) => {
  try {
    const products = await productModel.find({}).lean();
    res.render("products", {
      products,
      message: "Catalogo de Productos",
      styles: "/css/products.css",
    });
  } catch (error) {}
});

router.get("/products/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findById(pid).lean();
    if (!product) {
      return res.status(404).render("error", {
        message: "Producto no encontrado",
      });
    }

    res.render("product-detail", {
      product,
      styles: "/css/product-detail.css",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/carts/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartModel
      .findById(cid)
      .populate("products.product")
      .lean();

    if (!cart) {
      return res.status(404).render("error", {
        message: "Carrito no encontrado",
      });
    }

    cart.products.forEach((item) => {
      item.subtotal = item.product.price * item.quantity;
    });

    const total = cart.products.reduce((acc, item) => acc + item.subtotal, 0);

    res.render("cart-detail", {
      cart,
      total,
      styles: "/css/cart-detail.css",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/realtimeproducts", async (req, res, next) => {
  try {
    const products = await productModel.find({}).lean();
    res.render("realtime-products", {
      products,
      styles: "/css/products.css",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
