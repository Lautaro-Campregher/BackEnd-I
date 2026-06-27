import express from "express";
import { root } from "./utils.js";
import { engine } from "express-handlebars";
import ProductManager from "./dao/ProductManager.js";
import productsRoutes from "./routes/products-routes.js";
import viewsRoutes from "./routes/views-routes.js";
import cartsRoutes from "./routes/carts-routes.js";
import { Server } from "socket.io";

import { connectToMongo } from "./config/db.js";

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

const httpServer = app.listen(8080, () => {
  console.log("server ok");
  connectToMongo()
    .then(() => console.log("Conectado a DB"))
    .catch(console.error);
});

const io = new Server(httpServer);
app.set("io", io);

io.on("connection", (socket) => {
  console.log("Cliente conectado");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(root + "/public"));

app.use("/", viewsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    message: "Error interno del servidor",
  });
});
