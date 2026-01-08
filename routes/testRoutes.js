const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Open route - anyone can access
router.get("/open", (req, res) => {
  res.json({ message: "This route is public" });
});

// Protected route - any logged-in user
router.get("/user-only", protect, (req, res) => {
  res.json({
    message: "Welcome USER or ADMIN",
    user: req.user.username,
    role: req.user.role,
  });
});

// Admin-only route
router.get("/admin-only", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Welcome ADMIN",
    user: req.user.username,
    role: req.user.role,
  });
});

module.exports = router;
