const Product = require("../models/productModel");

// CREATE a product
const createProduct = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);
    console.log("Incoming file:", req.file);

    const {
      productName,
      category,
      productDescription,
      price,
      model,
      manufacturer,
      year,
      condition,
      registration,
      sellerId,
    } = req.body;

    const image = req.file ? req.file.filename : null;

    const product = new Product({
      productName,
      category,
      productDescription,
      price,
      model,
      manufacturer,
      year,
      condition,
      registration,
      sellerId,
      productImage: image,
    });

    const saved = await product.save();
    res.status(201).json({ message: "Product created", product: saved });
  } catch (error) {
    console.error("Create product error:", error); // <--- this logs the full error
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

// GET all products
const getAllProducts = async (req, res) => {
  try {
    // const products = await Product.find().populate(
    //   "sellerId",
    //   "firstName lastName email"
    // );
    const products = await Product.find();
    const total = await Product.countDocuments();

    res.json({ products, total });
  } catch (error) {
    console.error("Get All Products Error:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const requestCategory = req.params.category;

    const products = await Product.find({ category: requestCategory });
    const total = await Product.countDocuments({ category: requestCategory });

    res.json({ products, total });
  } catch (error) {
    console.error("Get Products By Category Error:", error.message);
    res.status(500).json({
      message: "Failed to fetch products by category",
      error: error.message,
    });
  }
};

// GET a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "sellerId",
      "firstName lastName email"
    );
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.error("Get Product By ID Error:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: error.message });
  }
};

// UPDATE a product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res
      .status(200)
      .json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.error("Update Product Error:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

// DELETE a product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
};
