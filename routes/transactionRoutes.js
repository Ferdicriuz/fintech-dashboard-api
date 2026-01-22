const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Correct destructured import from controller
const { makeTransaction, getTransactions } = require("../controllers/transactionController");

// Routes
router.post("/", protect, makeTransaction);
router.get("/", protect, getTransactions);

// Admin-only override route
router.post("/override", protect, adminOnly, (req, res) => {
  res.status(200).json({ success: true, message: "Admin override successful" });
});

module.exports = router;
