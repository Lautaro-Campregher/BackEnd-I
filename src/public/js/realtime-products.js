console.log("products.js cargado");

const socket = io();

socket.on("connect", () => {
  console.log("Socket conectado");
});

const container = document.getElementById("products-container");

socket.on("productsUpdated", (products) => {
  console.log("Evento recibido", products);

  container.innerHTML = "";

  products.forEach((product) => {
    container.innerHTML += `
      <ul>
        <li>
          <p>${product.name}</p>
          <p>${product.price}</p>
          <p>${product.description}</p>
          <p>${product.stock}</p>

          <img
            src="/img/products/${product.thumbnails[0]}"
            alt="${product.name}"
            width="200"
          >

          <a href="/products/${product._id}">
            Ver detalle
          </a>
        </li>
      </ul>
    `;
  });
});
