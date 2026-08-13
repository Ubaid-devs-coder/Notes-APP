import NoteCard from "./NoteCard.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NotesView = ({
  title,
  notes,
  loading,
  emptyTitle,
  emptySubtitle,
  onEdit,
  onPin,
  onArchive,
  onTrash,
  onRestore,
  onDeleteForever,
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  isPaginated,
}) => {
  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-5 shrink-0">
        <h2 className="text-xl font-bold text-slate-900">
          {title}
        </h2>
      </div>

      {/* =====================================================
          LOADING
      ====================================================== */}

      {loading ? (
        <div className="flex-1">
          <p className="text-sm text-slate-500">
            Loading notes...
          </p>
        </div>
      ) : notes.length === 0 ? (
        /* =====================================================
           EMPTY STATE
        ====================================================== */

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 bg-slate-100">
            <p className="text-3xl">📭</p>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-1.5">
            {emptyTitle}
          </h3>

          <p className="text-sm text-slate-500 max-w-xs">
            {emptySubtitle}
          </p>
        </div>
      ) : (
        <>
          {/* =================================================
              NOTES
          ================================================== */}

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 overflow-visible">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={onEdit}
                  onPin={onPin}
                  onArchive={onArchive}
                  onTrash={onTrash}
                  onRestore={onRestore}
                  onDeleteForever={onDeleteForever}
                />
              ))}
            </div>
          </div>

          {/* =================================================
              PAGINATION
          ================================================== */}

          {isPaginated && totalPages > 1 && (
            <div className="mt-auto pt-8 pb-2 flex items-center justify-center gap-4 shrink-0">
              {/* Previous */}

              <button
                type="button"
                onClick={onPreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all duration-200 disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-slate-200 disabled:hover:text-slate-700 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {/* Current Page */}

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

              {/* Next */}

              <button
                type="button"
                onClick={onNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all duration-200 disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-slate-200 disabled:hover:text-slate-700 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NotesView;