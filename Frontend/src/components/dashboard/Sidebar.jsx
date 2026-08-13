import { Link, useLocation } from "react-router-dom";
import {
  NotebookPen,
  LayoutDashboard,
  FileText,
  Pin,
  Archive,
  Trash2,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import useAuth from "../../hooks/useAuth.js";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "All Notes", path: "/dashboard", icon: FileText },
  { label: "Pinned Notes", path: "/dashboard", icon: Pin },
  { label: "Archived", path: "/dashboard", icon: Archive },
  { label: "Trash", path: "/dashboard", icon: Trash2 },
  { label: "Settings", path: "/dashboard", icon: Settings },
];

// Maps a menu item's label to the activeView value it represents on Dashboard.
// Settings is now handled as an internal Dashboard view instead of a separate route.
const VIEW_ITEMS = {
  Dashboard: "recent",
  "All Notes": "all",
  "Pinned Notes": "pinned",
  Archived: "archived",
  Trash: "trash",
  Settings: "settings",
};

// activeView / onChangeView are optional — Sidebar still works exactly as
// before (plain Link navigation) if a page doesn't pass them.
const Sidebar = ({ isOpen, onClose, onLogout, activeView, onChangeView }) => {
  const location = useLocation();
  const { user } = useAuth();

  // Fallback avatar generated from the real user's name, in case they haven't uploaded one
  const avatarUrl =
    user?.avatar ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      user?.fullName || "User"
    )}`;

  return (
    <>
      {/* Overlay for mobile drawer */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-[260px] bg-white border-r border-slate-200 flex flex-col z-40 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
              <NotebookPen size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">NoteFlow</span>
          </div>

          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-slate-700"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map(({ label, path, icon: Icon }) => {
            const view = VIEW_ITEMS[label];

            // Dashboard / All Notes / Pinned / Archived / Trash — switch activeView, no navigation
            if (view) {
              const isActive = activeView === view;

              const handleClick = () => {
                onChangeView?.(view);
                onClose();
              };

              return (
                <button
                  key={label}
                  type="button"
                  onClick={handleClick}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-left
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              );
            }

            // Everything else (Settings) — real navigation, unchanged
            const isActive = location.pathname === path;

            return (
              <Link
                key={label}
                to={path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer — Real logged-in user */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2 py-2">
            <img
              src={avatarUrl}
              alt="User avatar"
              className="w-10 h-10 rounded-full border border-slate-200 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {user?.fullName || "Loading..."}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.email || ""}
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full mt-2 flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors duration-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
