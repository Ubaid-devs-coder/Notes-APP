import { createContext, useState, useCallback } from "react";
import noteService from "../services/noteService.js";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [stats, setStats] = useState({
    totalNotes: 0,
    pinnedNotes: 0,
    archivedNotes: 0,
    trashedNotes: 0,
  });
  const [loading, setLoading] = useState(false);

  // Fetch all active notes
  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await noteService.getAllNotes();
      setNotes(data.notes);
    } catch (error) {
      console.error("Fetch Notes Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch dashboard statistics
  const fetchStats = useCallback(async () => {
    try {
      const data = await noteService.getDashboardStats();
      setStats(data.stats);
    } catch (error) {
      console.error("Fetch Stats Error:", error.response?.data || error.message);
    }
  }, []);

  // Create a note, then refresh notes + stats
  const createNote = async (noteData) => {
    const data = await noteService.createNote(noteData);
    await Promise.all([fetchNotes(), fetchStats()]);
    return data;
  };

  // Update a note, then refresh notes + stats
  const updateNote = async (id, noteData) => {
    const data = await noteService.updateNote(id, noteData);
    await Promise.all([fetchNotes(), fetchStats()]);
    return data;
  };

  // Soft delete a note, then refresh notes + stats
  const deleteNote = async (id) => {
    const data = await noteService.deleteNote(id);
    await Promise.all([fetchNotes(), fetchStats()]);
    return data;
  };

  // Toggle pin, then refresh notes + stats
  const pinNote = async (id) => {
    const data = await noteService.pinNote(id);
    await Promise.all([fetchNotes(), fetchStats()]);
    return data;
  };

  // Toggle archive, then refresh notes + stats
  const archiveNote = async (id) => {
    const data = await noteService.archiveNote(id);
    await Promise.all([fetchNotes(), fetchStats()]);
    return data;
  };

  // Restore a trashed note, then refresh notes + stats
  const restoreNote = async (id) => {
    const data = await noteService.restoreNote(id);
    await Promise.all([fetchNotes(), fetchStats()]);
    return data;
  };

  // Permanently delete a trashed note, then refresh notes + stats
  const deleteForever = async (id) => {
    const data = await noteService.deleteForever(id);
    await Promise.all([fetchNotes(), fetchStats()]);
    return data;
  };

  const value = {
    notes,
    stats,
    loading,
    fetchNotes,
    fetchStats,
    createNote,
    updateNote,
    deleteNote,
    pinNote,
    archiveNote,
    restoreNote,
    deleteForever,
  };

  return (
    <NoteContext.Provider value={value}>
      {children}
    </NoteContext.Provider>
  );
};
