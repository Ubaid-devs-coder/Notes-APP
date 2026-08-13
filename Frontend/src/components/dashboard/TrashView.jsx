import { useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Trash2,
  X,
} from "lucide-react";

import NoteCard from "./NoteCard.jsx";

const TrashView = ({
  notes,
  loading,
  onRestore,
  onDeleteForever,
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  isPaginated,
}) => {
  const [confirmAction, setConfirmAction] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // =========================================================
  // OPEN CONFIRMATION POPUP
  // =========================================================

  const handleOpenConfirm = (action, note) => {
    setConfirmAction({
      action,
      note,
    });
  };

  // =========================================================
  // CLOSE CONFIRMATION POPUP
  // =========================================================

  const handleCloseConfirm = () => {
    if (actionLoading) return;

    setConfirmAction(null);
  };

  // =========================================================
  // CONFIRM RESTORE / DELETE
  // =========================================================

  const handleConfirmAction = async () => {
    if (!confirmAction?.note) return;

    setActionLoading(true);

    try {
      if (confirmAction.action === "restore") {
        await onRestore(confirmAction.note);
      }

      if (confirmAction.action === "delete") {
        await onDeleteForever(confirmAction.note);
      }

      setConfirmAction(null);
    } catch (error) {
      console.error("Trash action failed:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const isRestore =
    confirmAction?.action === "restore";

  return (
    <>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">
          Trash
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Restore deleted notes or permanently remove them.
        </p>
      </div>

      {/* =====================================================
          LOADING / EMPTY / NOTES
      ====================================================== */}

      {loading ? (
        <p className="text-sm text-slate-500">
          Loading trash...
        </p>
      ) : notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 bg-slate-100">
            <Trash2
              size={32}
              className="text-slate-400"
            />
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-1.5">
            Trash is empty
          </h3>

          <p className="text-sm text-slate-500 max-w-xs">
            Deleted notes will appear here until they
            are permanently removed.
          </p>
        </div>
      ) : (
        <>
          {/* =================================================
              NOTES
          ================================================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 overflow-visible">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}

                // IMPORTANT:
                // These only open the BIG confirmation popup.
                onRestore={() =>
                  handleOpenConfirm(
                    "restore",
                    note
                  )
                }
                onDeleteForever={() =>
                  handleOpenConfirm(
                    "delete",
                    note
                  )
                }
              />
            ))}
          </div>

          {/* =================================================
              PAGINATION
          ================================================== */}

          {isPaginated && totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={onPreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <span className="text-sm font-medium text-slate-500">
                Page{" "}
                <span className="text-slate-900 font-semibold">
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className="text-slate-900 font-semibold">
                  {totalPages}
                </span>
              </span>

              <button
                type="button"
                onClick={onNextPage}
                disabled={
                  currentPage === totalPages
                }
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}

      {/* =====================================================
          BIG CENTERED CONFIRMATION POPUP
      ====================================================== */}

      {confirmAction && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4"
          onClick={handleCloseConfirm}
        >
          {/* =================================================
              POPUP CARD
          ================================================== */}

          <div
            className="w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* =================================================
                TOP SECTION
            ================================================== */}

            <div className="relative p-7">
              {/* Close */}

              <button
                type="button"
                onClick={handleCloseConfirm}
                disabled={actionLoading}
                className="absolute top-5 right-5 w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X size={18} />
              </button>

              {/* Icon */}

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  isRestore
                    ? "bg-emerald-50"
                    : "bg-red-50"
                }`}
              >
                {isRestore ? (
                  <RotateCcw
                    size={25}
                    className="text-emerald-600"
                  />
                ) : (
                  <Trash2
                    size={25}
                    className="text-red-600"
                  />
                )}
              </div>

              {/* Title */}

              <h3 className="mt-5 text-xl font-bold text-slate-900 pr-8">
                {isRestore
                  ? "Restore this note?"
                  : "Delete this note permanently?"}
              </h3>

              {/* Description */}

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {isRestore
                  ? "This note will be restored and removed from the trash."
                  : "This action cannot be undone. The note will be permanently deleted from your account."}
              </p>
            </div>

            {/* =================================================
                NOTE PREVIEW
            ================================================== */}

            <div className="px-7">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {confirmAction.note.title ||
                    "Untitled Note"}
                </p>

                {confirmAction.note.content && (
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    {confirmAction.note.content}
                  </p>
                )}
              </div>
            </div>

            {/* =================================================
                BUTTONS
            ================================================== */}

            <div className="flex flex-col-reverse sm:flex-row gap-3 p-7">
              {/* Cancel */}

              <button
                type="button"
                onClick={handleCloseConfirm}
                disabled={actionLoading}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>

              {/* Confirm */}

              <button
                type="button"
                onClick={handleConfirmAction}
                disabled={actionLoading}
                className={`flex-1 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
                  isRestore
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {actionLoading
                  ? isRestore
                    ? "Restoring..."
                    : "Deleting..."
                  : isRestore
                  ? "Restore Note"
                  : "Delete Forever"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrashView;