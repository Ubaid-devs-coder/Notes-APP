import { useEffect, useState } from "react";
import { X, NotebookPen } from "lucide-react";
import toast from "react-hot-toast";
import NoteForm from "./NoteForm.jsx";
import useNotes from "../../hooks/useNotes.js";

const EditNoteModal = ({ note, isOpen, onClose }) => {
  const { updateNote } = useNotes();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !note) return null;

  const handleUpdate = async (formData) => {
    setLoading(true);

    try {
      await updateNote(note._id, formData);
      toast.success("Note updated successfully");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-note-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-md animate-fadeIn"
      />

      <div className="relative z-10 w-full max-w-3xl max-h-[92vh] sm:max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">
        <div className="modal-scrollbar max-h-[92vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-8 lg:p-10">
          <div className="flex items-start justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-indigo-100 flex items-center justify-center shrink-0">
                <NotebookPen size={22} className="sm:w-[26px] sm:h-[26px] text-indigo-600" />
              </div>
              <div>
                <h2 id="edit-note-title" className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                  Edit Note
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
                  Update your note information
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors duration-200 shrink-0"
            >
              <X size={20} className="sm:w-[22px] sm:h-[22px]" />
            </button>
          </div>

          <NoteForm
            initialData={note}
            onSubmit={handleUpdate}
            onCancel={onClose}
            loading={loading}
            submitLabel="Update Note"
          />
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;
