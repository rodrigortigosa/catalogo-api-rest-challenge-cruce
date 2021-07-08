const express = require("express");
const app = express();

app.use(express.json());

//para permitir las politicas de CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

let products = require("./products.json");

const baseURL = "/api";

app.get(baseURL, (request, response) => {
  response.send("<h1>API Rest de catalogo para el challenge de Cruce</h1>");
});

app.get(baseURL + "/products", (request, response) => {
  response.json(products);
});

let idCount = products.length + 1;

app.post(baseURL + "/products", (request, response) => {
  const product = request.body;

  const newProduct = {
    id: idCount,
    name: product.name,
    image: product.image,
    price: product.price,
  };

  products = products.concat(newProduct);

  response.json(newProduct);
});
