import NoteCard from "./NoteCard.jsx";

const ArchivedView = ({
  notes,
  loading,
  onEdit,
  onPin,
  onArchive,
  onTrash,
}) => {
  return (
    <>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">Archived Notes</h2>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading archived notes...</p>
      ) : notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 bg-emerald-50">
            <p className="text-3xl">📦</p>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1.5">No archived notes</h3>
          <p className="text-sm text-slate-500 max-w-xs">
            Archived notes will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={onEdit}
              onPin={onPin}
              onArchive={onArchive}
              onTrash={onTrash}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ArchivedView;
