const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST /api/orders - Create a new order
router.post("/", async (req, res) => {
  try {
     console.log("Order received:", req.body);
    const {  email, cartItems } = req.body;
    

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const order = new Order({
      
      email,
      products: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: item.qty,
        price: item.price,
      })),
      total,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Order save failed:", err);
    res.status(500).json({ error: "Order could not be saved" });
  }
});

// GET /api/orders - View all orders
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
