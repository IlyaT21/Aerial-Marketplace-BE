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
    // Optional pagination via ?page=<number>
    const page = req.query.page ? parseInt(req.query.page, 10) : null;
    const limit = 12;

    let products;
    let total;

    if (page) {
      const skip = (page - 1) * limit;
      products = await Product.find().skip(skip).limit(limit);
      total = await Product.countDocuments();
      return res.json({
        products,
        total,
        page,
        pages: Math.ceil(total / limit),
      });
    } else {
      // No pagination: return all products
      products = await Product.find();
      total = await Product.countDocuments();
      return res.json({ products, total });
    }
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
    const page = parseInt(req.query.page, 10) || null;
    const limit = 12;
    const filter = { category: requestCategory };

    // If page is provided, do pagination
    if (page) {
      const skip = (page - 1) * limit;
      const total = await Product.countDocuments(filter);
      const products = await Product.find(filter)
        .skip(skip)
        .limit(limit)
        .populate("sellerId", "firstName lastName");

      return res.json({
        products,
        total,
        page,
        pages: Math.ceil(total / limit),
      });
    }

    // No pagination: return all in that category
    const products = await Product.find(filter).populate(
      "sellerId",
      "firstName lastName"
    );
    const total = await Product.countDocuments(filter);
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
    const productId = req.params.id;

    const updateData = {
      ...req.body,
    };

    // If a new image was uploaded, update the productImage field
    if (req.file) {
      updateData.productImage = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
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
