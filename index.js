const express = require("express");
const app = express();

//para permitir las politicas de CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const productsJSON = require("./products.json");

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const baseURL = "/api";

app.get(baseURL, (request, response) => {
  response.send("<h1>API Rest de catalogo para el challenge de Cruce</h1>");
});

let products = productsJSON;

app.get(baseURL + "/products", (request, response) => {
  response.json(products);
});
