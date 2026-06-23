const express = require("express");
const {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../controller/product.controller.js");
const router = express.Router();

router.post("/", createProduct);
router.get("/all", getAllProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
