const Note = require("../model/note.model");

// Create a new note
const createNote = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      color,
      image,
      isPinned,
    } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required.",
      });
    }

    // Create Note
    const note = await Note.create({
      user: req.user._id,
      title,
      content,
      category,
      color,
      image,
      isPinned,
    });

    return res.status(201).json({
      success: true,
      message: "Note created successfully.",
      note,
    });

  } catch (error) {
    console.error("Create Note Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all notes of the logged-in user
const getAllNotes = async (req, res) => {
  try {
    // Get all notes of the logged-in user
    const notes = await Note.find({
      user: req.user._id,
      isTrashed: false,
    }).sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      totalNotes: notes.length,
      notes,
    });

  } catch (error) {
    console.error("Get Notes Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a single note by ID
const getSingleNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Find note that belongs to the logged-in user
    const note = await Note.findOne({
      _id: id,
      user: req.user._id,
      isTrashed: false,
    });

    // Check if note exists
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    // Return note
    return res.status(200).json({
      success: true,
      note,
    });

  } catch (error) {
    console.error("Get Single Note Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a note by ID
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      content,
      category,
      color,
      image,
      isPinned,
    } = req.body;

    // Find the note belonging to the logged-in user
    const note = await Note.findOne({
      _id: id,
      user: req.user._id,
      isTrashed: false,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    // Update only the fields provided
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (category !== undefined) note.category = category;
    if (color !== undefined) note.color = color;
    if (image !== undefined) note.image = image;
    if (isPinned !== undefined) note.isPinned = isPinned;

    await note.save();

    return res.status(200).json({
      success: true,
      message: "Note updated successfully.",
      note,
    });

  } catch (error) {
    console.error("Update Note Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a note by ID (Soft Delete)
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Find note that belongs to the logged-in user
    const note = await Note.findOne({
      _id: id,
      user: req.user._id,
      isTrashed: false,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    // Soft Delete
    note.isTrashed = true;

    await note.save();

    return res.status(200).json({
      success: true,
      message: "Note moved to trash successfully.",
      note,
    });

  } catch (error) {
    console.error("Delete Note Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Pin or Unpin a note by ID
const pinNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Find note belonging to logged-in user
    const note = await Note.findOne({
      _id: id,
      user: req.user._id,
      isTrashed: false,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    // Toggle Pin
    note.isPinned = !note.isPinned;

    await note.save();

    return res.status(200).json({
      success: true,
      message: note.isPinned
        ? "Note pinned successfully."
        : "Note unpinned successfully.",
      note,
    });

  } catch (error) {
    console.error("Pin Note Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Archive or Unarchive a note by ID
const archiveNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Find note that belongs to the logged-in user
    const note = await Note.findOne({
      _id: id,
      user: req.user._id,
      isTrashed: false,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    // Toggle Archive
    note.isArchived = !note.isArchived;

    await note.save();

    return res.status(200).json({
      success: true,
      message: note.isArchived
        ? "Note archived successfully."
        : "Note unarchived successfully.",
      note,
    });

  } catch (error) {
    console.error("Archive Note Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search notes by title or content
const searchNotes = async (req, res) => {
  try {
    const { q } = req.query;

    // Check if search query is provided
    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required.",
      });
    }

    // Search notes
    const notes = await Note.find({
      user: req.user._id,
      isTrashed: false,
      $or: [
        {
          title: {
            $regex: q,
            $options: "i",
          },
        },
        {
          content: {
            $regex: q,
            $options: "i",
          },
        },
      ],
    }).sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      totalResults: notes.length,
      notes,
    });

  } catch (error) {
    console.error("Search Notes Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all archived notes of the logged-in user
const getArchivedNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user._id,
      isArchived: true,
      isTrashed: false,
    }).sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      totalArchivedNotes: notes.length,
      notes,
    });

  } catch (error) {
    console.error("Get Archived Notes Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all pinned notes of the logged-in user
const getPinnedNotes = async (req, res) => {
  try {
    // Get all pinned notes of logged-in user
    const notes = await Note.find({
      user: req.user._id,
      isPinned: true,
      isTrashed: false,
    }).sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      totalPinnedNotes: notes.length,
      notes,
    });

  } catch (error) {
    console.error("Get Pinned Notes Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all trashed notes of the logged-in user
const getTrashedNotes = async (req, res) => {
  try {
    // Get all trashed notes of logged-in user
    const notes = await Note.find({
      user: req.user._id,
      isTrashed: true,
    }).sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      totalTrashedNotes: notes.length,
      notes,
    });

  } catch (error) {
    console.error("Get Trashed Notes Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Restore a trashed note by ID
const restoreNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Find trashed note belonging to logged-in user
    const note = await Note.findOne({
      _id: id,
      user: req.user._id,
      isTrashed: true,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Trashed note not found.",
      });
    }

    // Restore note
    note.isTrashed = false;

    await note.save();

    return res.status(200).json({
      success: true,
      message: "Note restored successfully.",
      note,
    });

  } catch (error) {
    console.error("Restore Note Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Permanently delete a trashed note by ID
const deleteForever = async (req, res) => {
  try {
    const { id } = req.params;

    // Find trashed note belonging to logged-in user
    const note = await Note.findOne({
      _id: id,
      user: req.user._id,
      isTrashed: true,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Trashed note not found.",
      });
    }

    // Permanently delete note
    await Note.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Note deleted permanently.",
    });

  } catch (error) {
    console.error("Delete Forever Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get dashboard statistics for the logged-in user
const getDashboardStats = async (req, res) => {
  try {

    // Count all active notes
    const totalNotes = await Note.countDocuments({
      user: req.user._id,
      isTrashed: false,
    });

    // Count pinned notes
    const pinnedNotes = await Note.countDocuments({
      user: req.user._id,
      isPinned: true,
      isTrashed: false,
    });

    // Count archived notes
    const archivedNotes = await Note.countDocuments({
      user: req.user._id,
      isArchived: true,
      isTrashed: false,
    });

    // Count trash notes
    const trashedNotes = await Note.countDocuments({
      user: req.user._id,
      isTrashed: true,
    });

    return res.status(200).json({
      success: true,
      stats: {
        totalNotes,
        pinnedNotes,
        archivedNotes,
        trashedNotes,
      },
    });

  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
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
};