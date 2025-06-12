const express = require("express");
const productRouter = express.Router();

const productController = require("../controller/productController");

productRouter.post("/products", productController.addProduct);
productRouter.get("/products", productController.getProducts);
productRouter.delete("/products/:id", productController.deleteProduct);

module.exports = productRouter;
