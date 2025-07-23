// backend/routes/products.js

const express = require("express");
const router = express.Router();

// Dummy products array (later we connect to MongoDB)
const products = [
  {
    id: 1,
    name: "Red Printed T-Shirt",
    price: 50,
    image: "product-1.jpg",
  },
  {
    id: 2,
    name: "Black Sports Shoes",
    price: 80,
    image: "product-2.jpg",
  },
  {
    id: 3,
    name: "Blue Denim Jacket",
    price: 60,
    image: "product-3.jpg",
  }
];

// GET /api/products
router.get("/", (req, res) => {
  res.json(products);
});

module.exports = router;
