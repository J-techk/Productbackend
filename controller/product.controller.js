const Product = require("../model/product.model.js");
const User = require("../model/user.model.js");
// create product

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, rating, image, quantity, createdBy } =
      req.body;
    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Title already exists",
      });
    }
    const commodity = await Product.create({
      title,
      description,
      price,
      rating,
      image,
      quantity,
      createdBy,
    });
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      commodity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get all product
exports.getAllProduct = async (req, res) => {
  try {
    const product = await Product.find()
      .populate("createdBy", "userName email country gender")
      .sort({ createdAt: -1 });
    res.status(201).json({
      success: true,
      message: "Product retrieved successfully",
      count: product.length,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE product

exports.deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deleteProduct) {
      return;
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// UPDATE PRODUCT

exports.updateProduct = async (req, res) => {
  try {
    // const { id } = req.params;

    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after", //  retuns the updated documents
        runValidators: true, // validates the updated fields
      },
    );

    if (!updateProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      updateProduct,
    });
  } catch (error) {
    console.error("Error updating product");

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
