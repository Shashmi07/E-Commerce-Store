// backend/routes/orders.js

const express = require("express");
const router = express.Router();

// Dummy orders array (later connect to DB)
const orders = [
  {
    id: 1,
    userId: 101,
    products: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 }
    ],
    total: 180,
    status: "Processing"
  }
];

// GET /api/orders
router.get("/", (req, res) => {
  res.json(orders);
});

// POST /api/orders
router.post("/", (req, res) => {
  const newOrder = req.body;
  newOrder.id = Date.now();
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

module.exports = router;
