const Cart = require("../model/cartModel");

const addToCart = async (req, res) => {
  try {
    const item = new CartItem(req.body);

    const userId = req.user._id; // From verifyToken middleware
    const { productId, image, description, price } = req.body;

    const item = new Cart({
      userId,
      productId,
      image,
      description,
      price,
    });

    const saved = await item.save();
    res.json({ success: true, cartItem: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const items = await Cart.find({ userId });
    res.json({ success: true, cart: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const itemId = req.params.id;

    const cartItem = await Cart.findOne({ _id: itemId, userId });

    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found or unauthorized" });
    }

    await cartItem.remove();
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
