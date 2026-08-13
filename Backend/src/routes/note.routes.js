const express = require("express");

const {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
  pinNote,
  archiveNote,
  searchNotes,
  getArchivedNotes,
  getPinnedNotes,
  getTrashedNotes,
  restoreNote,
  deleteForever,
  getDashboardStats,
} = require("../controllers/notes.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

/* ==========================
        CREATE
========================== */
router.post("/", createNote);

/* ==========================
         READ
========================== */
router.get("/", getAllNotes);
router.get("/search", searchNotes);
router.get("/stats", getDashboardStats);
router.get("/archive", getArchivedNotes);
router.get("/pinned", getPinnedNotes);
router.get("/trash", getTrashedNotes);
router.get("/:id", getSingleNote);

/* ==========================
        UPDATE
========================== */
router.put("/:id", updateNote);
router.put("/:id/pin", pinNote);
router.put("/:id/archive", archiveNote);
router.put("/:id/restore", restoreNote);

/* ==========================
        DELETE
========================== */
router.delete("/:id", deleteNote);
router.delete("/:id/permanent", deleteForever);

module.exports = router;