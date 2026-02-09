// // const BASE_URL = "http://localhost:5000"; // 
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const helmet = require("helmet");
// const path = require("path");
// const profileRoutes = require("./routes/profileRoutes");

// // const rateLimit = require("express-rate-limit");

// const transactionRoutes = require("./routes/transactionRoutes");
// const errorHandler = require("./middleware/errorHandler");
// const authRoutes = require("./routes/authRoutes"); // your auth routes
// const adminRoutes = require("./routes/adminRoutes");


// const { swaggerUi, swaggerSpec } = require("./swagger");
// import healthRoutes from "./routes/health.js";

// // visible change for verification 👇
// console.log("🚀 Backend booted successfully - Session 57");

// app.use("/api", healthRoutes);


// const allowedOrigins = [
//   process.env.FRONTEND_URL
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // allow requests with no origin (Postman, curl)
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true
// }));



// // Security middleware
// app.use(helmet());
// app.use(
//   cors({
//     origin: true, // allow all origins (or specify frontend URL)
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // // Rate limiter
// // app.use(
// //   rateLimit({
// //     windowMs: 10 * 60 * 1000,
// //     max: 100,
// //   })
// // );



// app.use(express.static(path.join(__dirname, "public")));


// // Serve uploaded images
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Profile routes
// app.use("/api/profile", profileRoutes);

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/transactions", require("./routes/transactionRoutes"));
// app.use("/api/admin", adminRoutes);

// app.get("/health", (req, res) => {
//   res.json({ status: "API is running 🚀" });
// });

// // // Global error handler (must come after all routes)
// // app.use(errorHandler);

// app.use((err, req, res, next) => {
//   if (err instanceof Error) {
//     return res.status(400).json({ message: err.message });
//   }
//   next();
// });

// module.exports = app;





import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

// routes
import profileRoutes from "./routes/profileRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import healthRoutes from "./routes/health.js";

// middleware & utils
import errorHandler from "./middleware/errorHandler.js";
import { swaggerUi, swaggerSpec } from "./swagger.js";


// ==============================
// ES module replacement for __dirname
// ==============================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// ==============================
// App setup
// ==============================
const app = express();

// visible change for verification 👇
console.log("🚀 Backend booted successfully - Session 57");


// ==============================
// CORS
// ==============================
const allowedOrigins = [
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin(origin, callback) {
      // allow Postman / curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// ==============================
// Security & parsing middleware
// ==============================
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ==============================
// Docs
// ==============================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ==============================
// Static files
// ==============================
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ==============================
// Routes
// ==============================
app.use("/api", healthRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/admin", adminRoutes);


// ==============================
// Health fallback
// ==============================
app.get("/health", (req, res) => {
  res.json({ status: "API is running 🚀" });
});


// ==============================
// Error handling
// ==============================
app.use(errorHandler);

app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

export default app;
