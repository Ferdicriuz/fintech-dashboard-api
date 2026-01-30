const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Correct destructured import from controller
const { makeTransaction, getTransactions } = require("../controllers/transactionController");

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - type
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 5000
 *               type:
 *                 type: string
 *                 enum: [credit, debit]
 *               description:
 *                 type: string
 *                 example: Salary
 *     responses:
 *       201:
 *         description: Transaction created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully
 *       401:
 *         description: Unauthorized
 */

// Routes
router.post("/", protect, makeTransaction);
router.get("/", protect, getTransactions);

// Admin-only override route
router.post("/override", protect, adminOnly, (req, res) => {
  res.status(200).json({ success: true, message: "Admin override successful" });
});

module.exports = router;
