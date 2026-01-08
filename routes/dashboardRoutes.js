const express = require("express");
const {
  getDashboard,
  getTransactions,
} = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", protect, getDashboard);
router.get("/transactions", protect, getTransactions);

module.exports = router;
