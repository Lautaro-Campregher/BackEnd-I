import fs from "fs/promises";
import { GenericManager } from "./GenericManager.js";
import ProductManager from "./ProductManager.js";

class CartManager extends GenericManager {
  constructor(filePath) {
    super(filePath);
  }

  async #getCarts() {
    const carts = await fs.readFile(this.filePath, { encoding: "utf-8" });
    return JSON.parse(carts);
  }

  async createCart() {
    const carts = await this.#getCarts();

    const id = (() => {
      if (carts.length == 0) return 1;
      else return carts[carts.length - 1].id + 1;
    })();

    const newCart = {
      id,
      products: [],
    };

    carts.push(newCart);
    await fs.writeFile(this.filePath, JSON.stringify(carts), {
      encoding: "utf-8",
    });
    return newCart;
  }

  async getCartById(cid) {
    const carts = await this.#getCarts();
    const requiredCart = carts.find((carts) => carts.id == cid);
    return requiredCart;
  }

  async addProductToCart(cid, pid) {
    const carts = await this.#getCarts();
    const requiredCart = carts.find((carts) => carts.id == cid);
    if (!requiredCart) throw new Error("Carrito no encontrado");

    const { products } = requiredCart;

    await ProductManager.getProductById(pid);

    const productInCartIndex = products.findIndex(
      (product) => product.id == pid,
    );
    if (productInCartIndex == -1)
      products.push({ id: parseInt(pid), quantity: 1 });
    else products[productInCartIndex].quantity += 1;

    await fs.writeFile(this.filePath, JSON.stringify(carts), {
      encoding: "utf-8",
    });
    return requiredCart;
  }
}

export default new CartManager("carts.json");
