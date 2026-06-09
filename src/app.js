import express from "express";
import { root } from "./utils.js";
import { engine } from "express-handlebars";
import ProductManager from "./dao/ProductManager.js";
import productsRoutes from "./routes/products-routes.js";
import viewsRoutes from "./routes/views-routes.js";

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

app.use("/", viewsRoutes);
app.use("/api/products", productsRoutes);
