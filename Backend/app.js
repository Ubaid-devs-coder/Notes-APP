const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./src/routes/auth.routes");
const noteRoutes = require("./src/routes/note.routes");
const errorHandler = require("./src/middleware/error.middleware");

const app = express();

// =======================
// CORS Configuration
// =======================
const allowedOrigins = [
  "http://localhost:5173",
  "https://notes-app-zeta-rose.vercel.app/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin
      // (Postman, server-to-server requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// =======================
// Body Parsers
// =======================

// Increased limit from default 100kb to 10mb
// for Base64 image uploads
app.use(express.json({ limit: "10mb" }));

app.use(
  express.urlencoded({
    limit: "10mb",
    extended: true,
  })
);

// =======================
// Cookie Parser
// =======================
app.use(cookieParser());

// =======================
// Routes
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// =======================
// Error Handler
// =======================
app.use(errorHandler);

// =======================
// Export App
// =======================
module.exports = app;