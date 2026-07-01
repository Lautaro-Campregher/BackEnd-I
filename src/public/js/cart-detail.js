const cartId = "6a394d8c5d8ff77339cf7075";

const deleteButtons = document.querySelectorAll(".delete-product");

const clearCart = document.getElementById("clearCart");

deleteButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const productId = button.dataset.productId;
    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Producto eliminado");
      location.reload();
    } else {
      alert("Error al eliminar producto");
    }
  });
});

clearCart.addEventListener("click", async () => {
  const response = await fetch(`/api/carts/${cartId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    alert("Carrito vaciado");
    location.reload();
  } else {
    alert("Error al vaciar el carrito");
  }
});
