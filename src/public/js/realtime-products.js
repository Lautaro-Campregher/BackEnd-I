const socket = io();

const container = document.getElementById("products-container");

socket.on("productsUpdated", (products) => {
  container.innerHTML = "";

  const html = products
    .map(
      (product) => `
        <li>
          <p>${product.title}</p>
          <p>${product.price}</p>
          <p>${product.description}</p>
          <p>${product.stock}</p>

          <img
            src="/img/products/${product.thumbnails[0]}"
            alt="${product.title}"
            width="200"
          >

          <a href="/products/${product._id}">
            Ver detalle
          </a>
        </li>
      `,
    )
    .join("");

  container.innerHTML = `<ul>${html}</ul>`;
});
