const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  image: String,
  description: String,
  price: Number,
});

module.exports = mongoose.model("CartItem", cartItemSchema);
