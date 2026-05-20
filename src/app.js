import express from "express";
import { root } from "./utils.js";
import { engine } from "express-handlebars";
import ProductManager from "./dao/ProductManager.js";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", root + "/views");

app.listen(3000, () => {
  console.log("server ok");
});

//CRUD
//leer
//primero un string y luego argumentos (handlers)
app.get("/", async (req, res, next) => {
  res.render("index");
});

app.get("/products",async(req,res,next)=>{
  try{
    const products= await ProductManager.getProducts()
    res.render("products",{products,message:"Catalogo de Productos"});
  }catch (error) {
    console.log(error);
  }
})

