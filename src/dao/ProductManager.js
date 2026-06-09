import fs from "fs/promises";
import { GenericManager } from "./GenericManager.js";

class ProductManager extends GenericManager {
  constructor(filePath) {
    super(filePath);
  }

  async getProducts() {
    const products = await fs.readFile(this.filePath, { encoding: "utf-8" });
    if (products) return JSON.parse(products);
    else throw new Error("Error al leer los productos");
  }

  async getProductById(pid) {
    const products = await this.getProducts();
    const requiredProduct = products.find((p) => p.id == pid);
    if (requiredProduct) return requiredProduct;
    else throw new Error("Producto no encontrado");
  }

  async createdProduct(newProduct) {
    const products = await this.getProducts();
    if (products.length == 0) newProduct.id = 1;
    else {
      newProduct.id = products[products.length - 1].id + 1;
    }
    products.push(newProduct);
    await fs.writeFile(this.filePath, JSON.stringify(products, null, 2), {
      encoding: "utf-8",
    });
    return newProduct;
  }

  async updateProductById(pid, updateData) {
    const products = await this.getProducts();
    const requiredProductIndex = products.findIndex(
      (product) => product.id == pid,
    );
    products[requiredProductIndex] = { ...updateData, id: parseInt(pid) };
    await fs.writeFile(this.filePath, JSON.stringify(products), {
      encoding: "utf-8",
    });
    return products[requiredProductIndex];
  }

  async deleteProductById(pid) {
    const requiredProduct = await this.getProductById(pid);
    let products = await this.getProducts();
    products = products.filter((product) => product.id != pid);
    await fs.writeFile(this.filePath, JSON.stringify(products), {
      encoding: "utf-8",
    });
    return requiredProduct;
  }
}

export default new ProductManager("products.json");
