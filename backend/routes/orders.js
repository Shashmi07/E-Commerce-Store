const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST /api/orders — place an order
router.post("/", async (req, res) => {
  try {
    const { userId, items, total } = req.body;

    if (!userId || !items || items.length === 0 || !total) {
      return res.status(400).json({ msg: "Invalid order data" });
    }

    const newOrder = new Order({ user: userId, items, total });
    await newOrder.save();
    res.status(201).json({ msg: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
