const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    // Prefer the cookie (works for same-site / local dev), but fall back to
    // an Authorization: Bearer <token> header. This matters because the
    // frontend (vercel.app) and backend (onrender.com) are on different
    // domains — many browsers (Safari, Firefox, and increasingly Chrome)
    // block third-party cookies by default, so the cookie never actually
    // gets stored even though login/register "succeed". The Bearer header
    // is not subject to that restriction at all.
    const cookieToken = req.cookies.token;
    const authHeader = req.headers.authorization;
    const headerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    const token = cookieToken || headerToken;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // Attach user to request
    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = authMiddleware;