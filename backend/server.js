const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// 🟢 Middleware
app.use(cors());
app.use(express.json()); // ✅ Required to parse JSON body

// 🛣️ Routes
app.use("/api/auth", require("./routes/auth"));

// ⚡ Connect DB and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

