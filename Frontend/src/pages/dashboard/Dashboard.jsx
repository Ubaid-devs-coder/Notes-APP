import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Notebook, Pin, Archive, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import noteService from "../../services/noteService.js";

import Sidebar from "../../components/dashboard/Sidebar.jsx";
import TopNavbar from "../../components/dashboard/TopNavbar.jsx";
import DashboardHome from "../../components/dashboard/DashboardHome.jsx";
import AllNotesView from "../../components/dashboard/AllNotesView.jsx";
import PinnedView from "../../components/dashboard/PinnedView.jsx";
import ArchivedView from "../../components/dashboard/ArchivedView.jsx";
import TrashView from "../../components/dashboard/TrashView.jsx";
import FloatingButton from "../../components/dashboard/FloatingButton.jsx";
import MobileBottomNav from "../../components/dashboard/MobileBottomNav.jsx";
import CreateNoteModal from "../../components/notes/CreateNoteModal.jsx";
import EditNoteModal from "../../components/notes/EditNoteModal.jsx";
import SettingsView from "../../components/dashboard/SettingsView.jsx";
import ProfileView from "../../components/dashboard/ProfileView.jsx";
import useAuth from "../../hooks/useAuth.js";
import useNotes from "../../hooks/useNotes.js";

const NOTES_PER_PAGE = 6;

const VIEW_CONFIG = {
  recent: { heading: "Recent Notes" },
  all: { heading: "All Notes" },
  pinned: {
    heading: "Pinned Notes",
    emptyTitle: "No pinned notes",
    emptySubtitle: "Pin important notes so they always stay at the top.",
    emptyIcon: Pin,
    emptyIconColor: "text-amber-400",
    emptyIconBg: "bg-amber-50",
  },
  archived: {
    heading: "Archived Notes",
    emptyTitle: "No archived notes",
    emptySubtitle: "Archived notes will appear here.",
    emptyIcon: Archive,
    emptyIconColor: "text-emerald-400",
    emptyIconBg: "bg-emerald-50",
  },
  trash: {
    heading: "Trash",
    emptyTitle: "Trash is empty",
    emptySubtitle: "Deleted notes will appear here until they are permanently removed.",
    emptyIcon: Trash2,
    emptyIconColor: "text-red-400",
    emptyIconBg: "bg-red-50",
  },
  settings: {
    heading: "Settings",
  },
  profile: {
    heading: "My Profile",
  },
};

const VIEW_FILTERS = {
  pinned: (note) => note.isPinned,
  archived: (note) => note.isArchived,
  trash: (note) => note.isTrashed,
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [activeView, setActiveView] = useState("recent");

  const { logout, deleteAccount } = useAuth();
  const {
    notes,
    stats,
    loading,
    fetchNotes,
    fetchStats,
    deleteNote,
    pinNote,
    archiveNote,
    restoreNote,
    deleteForever,
  } = useNotes();
  const [trashedNotes, setTrashedNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
    fetchStats();
  }, [fetchNotes, fetchStats]);

  const changeView = (view) => {
    setActiveView(view);
    setCurrentPage(1);
  };

  // Resets pagination to page 1 whenever the search query changes —
  // independent of changeView, since search can happen inside any view.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
  try {
    await deleteAccount();

    toast.success("Account deleted permanently.");

    navigate("/login", { replace: true });
  } catch (error) {
    console.error("Delete Account Error:", error);

    toast.error(
      error.response?.data?.message ||
      "Failed to delete account. Please try again."
    );
  }
};

  const handleEditNote = (note) => {
    setNoteToEdit(note);
    setOpenEditModal(true);
  };

  const handlePinToggle = async (note) => {
    try {
      await pinNote(note._id);
      toast.success(note.isPinned ? "Note unpinned" : "Note pinned");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update pin state");
      return false;
    }
  };

  const handleArchiveToggle = async (note) => {
    try {
      await archiveNote(note._id);
      toast.success(note.isArchived ? "Note unarchived" : "Note archived");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update archive state");
      return false;
    }
  };

  const handleTrash = async (note) => {
    try {
      await deleteNote(note._id);
      toast.success("Note moved to trash");
      if (activeView === "trash") await fetchTrashedNotes();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to move note to trash");
      return false;
    }
  };

  const handleRestore = async (note) => {
    try {
      await restoreNote(note._id);
      toast.success("Note restored successfully");
      if (activeView === "trash") await fetchTrashedNotes();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to restore note");
      return false;
    }
  };

  const handleDeleteForever = async (note) => {
    try {
      await deleteForever(note._id);
      toast.success("Note permanently deleted");
      if (activeView === "trash") await fetchTrashedNotes();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete note forever");
      return false;
    }
  };

  const fetchTrashedNotes = async () => {
    try {
      const fromContext = notes.filter((n) => n.isTrashed);
      if (fromContext.length > 0) {
        setTrashedNotes(fromContext);
        return;
      }

      const data = await noteService.getTrashedNotes();
      setTrashedNotes(data.notes || []);
    } catch (error) {
      console.error("Failed to fetch trashed notes:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (activeView === "trash") {
      fetchTrashedNotes();
    }
  }, [activeView, notes]);

  const statCards = [
    {
      title: "Total Notes",
      value: stats.totalNotes,
      icon: Notebook,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50",
      onClick: () => changeView("all"),
    },
    {
      title: "Pinned",
      value: stats.pinnedNotes,
      icon: Pin,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
      onClick: () => changeView("pinned"),
    },
    {
      title: "Archived",
      value: stats.archivedNotes,
      icon: Archive,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      onClick: () => changeView("archived"),
    },
    {
      title: "Trash",
      value: stats.trashedNotes,
      icon: Trash2,
      iconColor: "text-red-600",
      iconBg: "bg-red-50",
      onClick: () => changeView("trash"),
    },
  ];

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const isSearching = trimmedQuery.length > 0;

  // Shared predicate — title or content contains the query (case-insensitive)
  const matchesSearch = (note) => {
    const title = (note.title || "").toLowerCase();
    const content = (note.content || "").toLowerCase();
    return title.includes(trimmedQuery) || content.includes(trimmedQuery);
  };

  // Search is applied AFTER the view filter and BEFORE pagination, so
  // pagination always reflects the searched results, not the raw view.
  const viewNotes = useMemo(() => {
    const filterFn = VIEW_FILTERS[activeView];
    let result = filterFn ? notes.filter(filterFn) : notes;
    if (isSearching) result = result.filter(matchesSearch);
    return result;
  }, [notes, activeView, isSearching, trimmedQuery]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(viewNotes.length / NOTES_PER_PAGE));
  }, [viewNotes.length]);

  const paginatedNotes = useMemo(() => {
    const startIndex = (currentPage - 1) * NOTES_PER_PAGE;
    return viewNotes.slice(startIndex, startIndex + NOTES_PER_PAGE);
  }, [viewNotes, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const isPaginatedView = activeView !== "recent";

  // "recent" shows a flat top-6 slice with no pagination UI — UNLESS the
  // user is searching, in which case DashboardHome gets the full searched
  // list (viewNotes) instead of being capped to 6 items.
  const displayedNotes =
    activeView === "recent"
      ? isSearching
        ? viewNotes
        : notes.slice(0, NOTES_PER_PAGE)
      : paginatedNotes;

  // Trashed notes — search applied the same way, before pagination
  const searchedTrashedNotes = useMemo(() => {
    if (!isSearching) return trashedNotes;
    return trashedNotes.filter(matchesSearch);
  }, [trashedNotes, isSearching, trimmedQuery]);

  const trashedTotalPages = Math.max(1, Math.ceil(searchedTrashedNotes.length / NOTES_PER_PAGE));
  const trashedPaginatedNotes = (() => {
    const startIndex = (currentPage - 1) * NOTES_PER_PAGE;
    return searchedTrashedNotes.slice(startIndex, startIndex + NOTES_PER_PAGE);
  })();

  const currentView = VIEW_CONFIG[activeView];
  const EmptyIcon = currentView.emptyIcon;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        activeView={activeView}
        onChangeView={changeView}
      />

      <div className="lg:pl-[260px]">
        <TopNavbar
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={handleLogout}
          onChangeView={changeView}
          onCreateNote={() => setOpenCreateModal(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="p-3.5 sm:p-6 lg:p-8 pb-28 lg:pb-12 max-w-7xl mx-auto">
          {activeView === "recent" ? (
            <DashboardHome
              stats={stats}
              notes={displayedNotes}
              loading={loading}
              onEdit={handleEditNote}
              onPin={handlePinToggle}
              onArchive={handleArchiveToggle}
              onTrash={handleTrash}
              onChangeView={changeView}
            />
          ) : activeView === "all" ? (
            <AllNotesView
              notes={paginatedNotes}
              loading={loading}
              onEdit={handleEditNote}
              onPin={handlePinToggle}
              onArchive={handleArchiveToggle}
              onTrash={handleTrash}
              onRestore={handleRestore}
              onDeleteForever={handleDeleteForever}
              currentPage={currentPage}
              totalPages={totalPages}
              onPreviousPage={goToPreviousPage}
              onNextPage={goToNextPage}
              isPaginated={activeView !== "recent"}
            />
          ) : activeView === "pinned" ? (
            <PinnedView
              notes={paginatedNotes}
              loading={loading}
              onEdit={handleEditNote}
              onPin={handlePinToggle}
              onArchive={handleArchiveToggle}
              onTrash={handleTrash}
              currentPage={currentPage}
              totalPages={totalPages}
              onPreviousPage={goToPreviousPage}
              onNextPage={goToNextPage}
              isPaginated={activeView !== "recent"}
            />
          ) : activeView === "archived" ? (
            <ArchivedView
              notes={paginatedNotes}
              loading={loading}
              onEdit={handleEditNote}
              onPin={handlePinToggle}
              onArchive={handleArchiveToggle}
              onTrash={handleTrash}
              currentPage={currentPage}
              totalPages={totalPages}
              onPreviousPage={goToPreviousPage}
              onNextPage={goToNextPage}
              isPaginated={activeView !== "recent"}
            />
          ) : activeView === "trash" ? (
            <TrashView
              notes={trashedPaginatedNotes}
              loading={loading}
              onRestore={handleRestore}
              onDeleteForever={handleDeleteForever}
              currentPage={currentPage}
              totalPages={trashedTotalPages}
              onPreviousPage={goToPreviousPage}
              onNextPage={goToNextPage}
              isPaginated={activeView !== "recent"}
            />
          ) : activeView === "profile" ? (
            <ProfileView onLogout={handleLogout} onChangeView={changeView} />
          ) : (
            <SettingsView onLogout={handleLogout} onDeleteAccount={handleDeleteAccount} />
          )}
        </main>
      </div>

      <FloatingButton onClick={() => setOpenCreateModal(true)} />

      <MobileBottomNav activeView={activeView} onChangeView={changeView} />

      <CreateNoteModal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onSuccess={() => setCurrentPage(1)}
      />

      <EditNoteModal
        note={noteToEdit}
        isOpen={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setNoteToEdit(null);
        }}
      />
    </div>
  );
};

export default Dashboard;
