const express = require("express");
const {
  getDashboard,
  getTransactions,
} = require("../controllers/dashboardController");
const { getDashboardSummary } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", protect, getDashboard);
router.get("/transactions", protect, getTransactions);
router.get("/", protect, getDashboardSummary);

module.exports = router;
