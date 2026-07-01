import { Router, json, urlencoded } from "express";
import ProductManager from "../dao/ProductManager.js";
import { productModel } from "../models/products.model.js";
import { uploader } from "../utils.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort, query } = req.query;

    const filter = {};

    if (query) {
      if (query === "true" || query === "false") {
        filter.status = query === "true";
      } else {
        filter.category = query;
      }
    }

    const options = {
      page,
      limit,
      lean: true,
    };

    if (sort) {
      options.sort = {
        price: sort === "asc" ? 1 : -1,
      };
    }

    const pagination = await productModel.paginate(filter, options);

    res.status(200).json({
      status: "success",
      payload: pagination.docs,
      totalPages: pagination.totalPages,
      prevPage: pagination.prevPage,
      nextPage: pagination.nextPage,
      page: pagination.page,
      hasPrevPage: pagination.hasPrevPage,
      hasNextPage: pagination.hasNextPage,
      prevLink: pagination.hasPrevPage
        ? `/api/products?page=${pagination.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}`
        : null,
      nextLink: pagination.hasNextPage
        ? `/api/products?page=${pagination.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}`
        : null,
    });
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
    res.status(200).json(requiredProduct);
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

    const io = req.app.get("io");
    const products = await productModel.find({}).lean();

    io.emit("productsUpdated", products);
    console.log("Evento productsUpdated enviado");

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.put("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const update = req.body;

    const product = await productModel.findByIdAndUpdate(pid, update, {
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
    const product = await productModel.findByIdAndDelete(pid);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

export default router;
