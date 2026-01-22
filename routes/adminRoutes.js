const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Admin-only override route
// router.post("/override", protect, adminOnly, (req, res) => {
//   // Example: override could modify something
//   res.status(200).json({
//     success: true,
//     message: "Admin override successful"
//   });
// });

module.exports = router;
