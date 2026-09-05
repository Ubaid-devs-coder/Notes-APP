import { Notebook, Pin, Archive, Trash2 } from "lucide-react";
import StatCard from "./StatCard.jsx";
import NoteCard from "./NoteCard.jsx";

const DashboardHome = ({
  stats,
  notes,
  loading,
  onEdit,
  onPin,
  onArchive,
  onTrash,
  onChangeView,
}) => {
  const recentNotes = notes.slice(0, 6);

  const statCards = [
    {
      title: "Total Notes",
      value: stats.totalNotes,
      icon: Notebook,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50",
      onClick: () => onChangeView("all"),
    },
    {
      title: "Pinned",
      value: stats.pinnedNotes,
      icon: Pin,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
      onClick: () => onChangeView("pinned"),
    },
    {
      title: "Archived",
      value: stats.archivedNotes,
      icon: Archive,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      onClick: () => onChangeView("archived"),
    },
    {
      title: "Trash",
      value: stats.trashedNotes,
      icon: Trash2,
      iconColor: "text-red-600",
      iconBg: "bg-red-50",
      onClick: () => onChangeView("trash"),
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-slate-100 dark:to-indigo-200 tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm sm:text-base">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {statCards.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Notes</h2>
        <button
          onClick={() => onChangeView("all")}
          className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-300"
        >
          View All
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading notes...</p>
      ) : recentNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 bg-slate-100">
            <Notebook size={36} className="text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1.5">No notes yet</h3>
          <p className="text-sm text-slate-500 max-w-xs">
            Create your first note to see it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {recentNotes.map((note) => (
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

export default DashboardHome;
