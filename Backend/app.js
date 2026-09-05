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
// FRONTEND_URL is read from an environment variable (set it in Render's
// dashboard) instead of being hardcoded here — so when your Vercel URL
// changes, you update one env var instead of editing code and redeploying.
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL, // e.g. https://notes-app-xxxx.vercel.app — set this in Render
].filter(Boolean); // drops FRONTEND_URL from the list if it isn't set yet

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin
      // (Postman, server-to-server requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.includes("localhost")
      ) {
        return callback(null, true);
      }

      console.warn(`Blocked by CORS: ${origin}`); // helps debug this exact issue in logs
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
// Routes (Mounted for both standalone Express & Vercel Serverless)
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

// =======================
// Error Handler
// =======================
app.use(errorHandler);

// =======================
// Export App
// =======================
module.exports = app;
