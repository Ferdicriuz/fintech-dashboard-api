const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const transactionRoutes = require("./routes/transactionRoutes");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes"); // your auth routes


// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiter
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
  })
);


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// Global error handler (must come after all routes)
app.use(errorHandler);

module.exports = app;





