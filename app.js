// const BASE_URL = "http://localhost:5000"; // 
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const profileRoutes = require("./routes/profileRoutes");
// const rateLimit = require("express-rate-limit");

const transactionRoutes = require("./routes/transactionRoutes");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes"); // your auth routes
const adminRoutes = require("./routes/adminRoutes");

const { swaggerUi, swaggerSpec } = require("./swagger");



// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: true, // allow all origins (or specify frontend URL)
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Rate limiter
// app.use(
//   rateLimit({
//     windowMs: 10 * 60 * 1000,
//     max: 100,
//   })
// );
app.use(express.static(path.join(__dirname, "public")));


// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Profile routes
app.use("/api/profile", profileRoutes);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/admin", adminRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "API is running 🚀" });
});

// // Global error handler (must come after all routes)
// app.use(errorHandler);

app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

module.exports = app;





