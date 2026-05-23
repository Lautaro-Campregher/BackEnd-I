import express from "express";
import { root } from "./utils.js";
import { engine } from "express-handlebars";
import ProductManager from "./dao/ProductManager.js";

const app = express();

app.engine(
  "handlebars",
  engine({
    helpers: {
      isStock: (stock, min) => stock > min,
    },
    partialsDir: root + "/views/partials",
  }),
);
app.set("view engine", "handlebars");
app.set("views", root + "/views");

app.listen(3000, () => {
  console.log("server ok");
});

app.use(express.static(root + "/public"));
app.use(express.json(), express.urlencoded({ extended: true }));

//CRUD
//leer
//primero un string y luego argumentos (handlers)
app.get("/", async (req, res, next) => {
  res.render("index", {
    styles: "/css/index.css",
  });
});

app.get("/products", async (req, res, next) => {
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
