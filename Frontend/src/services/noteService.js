import axiosInstance from "./axios.js";

// Create a new note
const createNote = async (noteData) => {
  const response = await axiosInstance.post("/notes", noteData);
  return response.data;
};

// Get all active notes
const getAllNotes = async () => {
  const response = await axiosInstance.get("/notes");
  return response.data;
};

// Get a single note by ID
const getSingleNote = async (id) => {
  const response = await axiosInstance.get(`/notes/${id}`);
  return response.data;
};

// Update a note by ID
const updateNote = async (id, noteData) => {
  const response = await axiosInstance.put(`/notes/${id}`, noteData);
  return response.data;
};

// Soft delete a note (move to trash)
const deleteNote = async (id) => {
  const response = await axiosInstance.delete(`/notes/${id}`);
  return response.data;
};

// Toggle pin on a note
const pinNote = async (id) => {
  const response = await axiosInstance.put(`/notes/${id}/pin`);
  return response.data;
};

// Toggle archive on a note
const archiveNote = async (id) => {
  const response = await axiosInstance.put(`/notes/${id}/archive`);
  return response.data;
};

// Search notes by keyword
const searchNotes = async (query) => {
  const response = await axiosInstance.get(
    `/api/notes/search?q=${encodeURIComponent(query)}`
  );
  return response.data;
};

// Get all archived notes
const getArchivedNotes = async () => {
  const response = await axiosInstance.get("/notes/archive");
  return response.data;
};

// Get all pinned notes
const getPinnedNotes = async () => {
  const response = await axiosInstance.get("/notes/pinned");
  return response.data;
};

// Get all trashed notes
const getTrashedNotes = async () => {
  const response = await axiosInstance.get("/notes/trash");
  return response.data;
};

// Restore a trashed note
const restoreNote = async (id) => {
  const response = await axiosInstance.put(`/notes/${id}/restore`);
  return response.data;
};

// Permanently delete a trashed note
const deleteForever = async (id) => {
  const response = await axiosInstance.delete(
    `/api/notes/${id}/permanent`
  );
  return response.data;
};

// Get dashboard statistics
const getDashboardStats = async () => {
  const response = await axiosInstance.get("/notes/stats");
  return response.data;
};

const noteService = {
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

export default noteService;