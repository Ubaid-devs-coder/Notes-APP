

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./src/routes/auth.routes");
const noteRoutes = require("./src/routes/note.routes");
const errorHandler = require("./src/middleware/error.middleware");

const app = express();

// =======================
// Middlewares
// =======================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Increased limit from default 100kb to 10mb for Base64 image uploads
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

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

module.exports = app;