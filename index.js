const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

//para permitir las politicas de CORS
app.use(cors());

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
  if (products.length === 0) {
    response.send("No hay productos");
  } else {
    response.json(products);
  }
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
  idCount++;
  response.status(201).json(newProduct);
});

app.delete(baseURL + "/products/:id", (request, response) => {
  const id = Number(request.params.id);
  products = products.filter((product) => product.id !== id);

  response.status(204).end();
});

app.put(baseURL + "/products/:id", (request, response) => {
  const id = Number(request.params.id);
  const productEdited = request.body;

  products.map((productToEdit) => {
    if (productToEdit.id === id) {
      productToEdit.image = productEdited.image;
      productToEdit.name = productEdited.name;
      productToEdit.price = productEdited.price;
    }
  });
  response.json(productEdited);
});
