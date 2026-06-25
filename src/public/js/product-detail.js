const button = document.getElementById("addToCart");

const cartId = "6a394d8c5d8ff77339cf7075";

button.addEventListener("click", async () => {
  const productId = button.dataset.productId;

  const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
    method: "POST",
  });

  if (response.ok) {
    alert("Producto agregado al carrito");
  } else {
    alert("Error al agregar producto");
  }

  const cart = await response.json();

  console.log(cart);
});
