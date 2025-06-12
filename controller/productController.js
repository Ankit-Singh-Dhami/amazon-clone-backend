const Product = require("../model/productModel");

const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);

    if (!req.body.image || !req.body.description || !req.body.price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const saved = await product.save();
    res
      .status(201)
      .json({ success: true, message: "Product added", product: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
  deleteProduct,
};
