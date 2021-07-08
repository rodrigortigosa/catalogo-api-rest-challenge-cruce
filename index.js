const express = require("express");
const app = express();
const productsJSON = require("./products.json");

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api", (request, response) => {
  response.send("<h1>API Rest de catalogo para el challenge de Cruce</h1>");
});

let products = productsJSON;

app.get("/api/products", (request, response) => {
  response.json(products);
});
