const express = require("express");
const router = express.Router();

const { makeTransaction, getTransactions } = require("../controllers/transactionController");
const protect = require("../middleware/authMiddleware");

// ✅ Both protect and makeTransaction are functions now
router.post("/", protect, makeTransaction);
router.get("/", protect, getTransactions);

module.exports = router;
