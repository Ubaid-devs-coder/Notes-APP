const express = require("express");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    message: "Auth route working"
  });
});


const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  logoutUser,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");


// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);


// Protected Routes
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
router.delete("/delete-account", authMiddleware, deleteAccount);
router.post("/logout", authMiddleware, logoutUser);


module.exports = router;