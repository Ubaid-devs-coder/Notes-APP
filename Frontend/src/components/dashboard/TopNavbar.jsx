import { Search, Bell, Menu, ChevronDown, Plus, X, Sun, Moon } from "lucide-react";
import useAuth from "../../hooks/useAuth.js";
import useDropdown from "../../hooks/useDropdown.js";
import useTheme from "../../hooks/useTheme.js";

// searchQuery / onSearchChange are optional — the input still renders fine
// (just non-functional) if a page doesn't pass them.
const TopNavbar = ({ onMenuClick, onLogout, onChangeView, onCreateNote, searchQuery = "", onSearchChange }) => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { ref, isOpen: dropdownOpen, toggle, close } = useDropdown("profile-dropdown");

  // Fallback avatar generated from the real user's name, in case they haven't uploaded one
  const avatarUrl =
    user?.avatar ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      user?.fullName || "User"
    )}`;

  return (
    <header className="h-18 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
      {/* Left — Hamburger (mobile/tablet) + Search */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-500 hover:text-slate-800"
        >
          <Menu size={24} />
        </button>

        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search your notes..."
            className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-slate-100 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300"
          />

          {/* Clear button — only shows once the user has typed something */}
          {searchQuery.length > 0 && (
            <button
              onClick={() => onSearchChange?.("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors duration-200"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Right — Create note, Appearance, notifications + Avatar */}
      <div className="flex items-center gap-2 sm:gap-3 ml-4">
        <button
          type="button"
          onClick={onCreateNote}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-indigo-200 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Create Note</span>
        </button>

        {/* Appearance (Theme Toggle Button) */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
          title={`Appearance: ${isDark ? "Dark Theme (click for Light)" : "Light Theme (click for Dark)"}`}
          className="p-2 sm:p-2.5 rounded-2xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isDark ? (
            <Sun size={20} className="text-amber-400 transition-transform duration-300 hover:rotate-45" />
          ) : (
            <Moon size={20} className="text-slate-600 transition-transform duration-300 hover:-rotate-12" />
          )}
        </button>

        <button className="relative p-2 text-slate-500 hover:text-slate-800 transition-colors duration-300">
          <Bell size={22} />
          <span className="absolute 1 top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="relative" ref={ref}>
          <button
            onClick={toggle}
            className="flex items-center gap-2"
          >
            <img
              src={avatarUrl}
              alt="User avatar"
              className="w-9 h-9 rounded-full border border-slate-200 object-cover"
            />
            <ChevronDown
              size={16}
              className={`hidden sm:block text-slate-500 transition-transform duration-300 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-30">
              <p className="px-4 py-2 text-sm font-semibold text-slate-900 border-b border-slate-100 truncate">
                {user?.fullName || "Loading..."}
              </p>

              <button
                type="button"
                onClick={() => {
                  close();
                  onChangeView?.("profile");
                }}
                className="block w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                My Profile
              </button>

              <button
                type="button"
                onClick={() => {
                  close();
                  onChangeView?.("settings");
                }}
                className="block w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                Settings
              </button>

              {/* Appearance Toggle Item */}
              <button
                type="button"
                onClick={() => {
                  toggleTheme();
                }}
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-600" />}
                  Appearance
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {isDark ? "Dark" : "Light"}
                </span>
              </button>

              <div className="my-1 border-t border-slate-100" />

              <button
                onClick={() => {
                  close();
                  onLogout();
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
