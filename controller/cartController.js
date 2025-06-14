const Cart = require("../model/cartModel");

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { _id, image, description, price } = req.body;

    const item = new Cart({
      userId,
      productId: _id,
      image,
      description,
      price,
    });

    const saved = await item.save();
    console.log(saved);
    res.json({ success: true, cartItem: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await Cart.find({ userId });
    res.json({ success: true, cart: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;
    console.log(productId);

    const cartItem = await Cart.findOneAndDelete({ userId, productId });

    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found or unauthorized" });
    }

    res.json({ success: true, message: "Cart item deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  deleteCart,
};
