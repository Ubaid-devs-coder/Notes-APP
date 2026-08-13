import NotesView from "./NotesView.jsx";

const AllNotesView = ({
  notes,
  loading,
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
    <NotesView
      title="All Notes"
      notes={notes}
      loading={loading}
      emptyTitle="No notes yet"
      emptySubtitle="Create your first note to get started."
      onEdit={onEdit}
      onPin={onPin}
      onArchive={onArchive}
      onTrash={onTrash}
      onRestore={onRestore}
      onDeleteForever={onDeleteForever}
      currentPage={currentPage}
      totalPages={totalPages}
      onPreviousPage={onPreviousPage}
      onNextPage={onNextPage}
      isPaginated={isPaginated}
    />
  );
};

export default AllNotesView;
