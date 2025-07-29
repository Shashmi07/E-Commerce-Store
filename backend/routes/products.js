const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Upload folder
  },
  filename: function (req, file, cb) {
    // Create unique filename: timestamp-originalname
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

// GET single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add product with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, inStock } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const product = new Product({
      name,
      price,
      description,
      inStock: inStock === "true",
      image: imagePath,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
