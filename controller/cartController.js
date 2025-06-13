const CartItem = require("../model/cartModel");

const addToCart = async (req, res) => {
  try {
    const item = new CartItem(req.body);
    const saved = await item.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const items = await CartItem.find();
    res.json({ success: true, cart: items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Cart item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  deleteCart,
};
