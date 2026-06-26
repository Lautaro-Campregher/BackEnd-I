console.log("products.js cargado");

const socket = io();

socket.on("connect", () => {
  console.log("Socket conectado");
});

socket.on("productsUpdated", (products) => {
  console.log("Evento recibido", products);
});
