const express = require("express");
const cartRouter = express.Router();

const cartController = require("../controller/cartController");

cartRouter.post("/cart", cartController.addToCart);
cartRouter.get("/cart", cartController.getCart);
cartRouter.delete("/cart/:id", cartController.deleteCart);

module.exports = cartRouter;
