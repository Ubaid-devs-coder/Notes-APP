import { useContext } from "react";
import { NoteContext } from "../context/NoteContext.jsx";

// Small wrapper hook so components never import NoteContext + useContext directly
const useNotes = () => {
  const context = useContext(NoteContext);

  if (!context) {
    throw new Error("useNotes must be used within a NoteProvider");
  }

  return context;
};

export default useNotes;