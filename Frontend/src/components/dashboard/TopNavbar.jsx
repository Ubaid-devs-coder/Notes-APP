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
    <header className="h-18 bg-white border-b border-slate-200 flex items-center justify-between px-3 sm:px-6 sticky top-0 z-20">
      {/* Left — Hamburger (mobile/tablet) + Search */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 pr-2">
        <button
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="lg:hidden text-slate-500 hover:text-slate-800 shrink-0 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Menu size={22} className="sm:w-6 sm:h-6" />
        </button>

        <div className="relative w-full max-w-md">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-9 pr-8 sm:pl-11 sm:pr-10 py-2 sm:py-2.5 rounded-xl bg-slate-100 text-xs sm:text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300"
          />

          {/* Clear button — only shows once the user has typed something */}
          {searchQuery.length > 0 && (
            <button
              onClick={() => onSearchChange?.("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors duration-200"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Right — Create note, Appearance, notifications + Avatar */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={onCreateNote}
          className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-indigo-200 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Plus size={16} />
          <span>Create Note</span>
        </button>

        {/* Appearance (Theme Toggle Button) */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
          title={`Appearance: ${isDark ? "Dark Theme (click for Light)" : "Light Theme (click for Dark)"}`}
          className={`p-2 sm:p-2.5 rounded-2xl transition-all duration-300 active:scale-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
            isDark
              ? "bg-amber-400/10 text-amber-300 hover:bg-amber-400/20 border border-amber-400/25 shadow-md shadow-amber-400/10"
              : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-100 shadow-sm shadow-indigo-100"
          }`}
        >
          {isDark ? (
            <Sun size={19} className="transition-transform duration-500 hover:rotate-90 text-amber-300" />
          ) : (
            <Moon size={19} className="transition-transform duration-500 hover:-rotate-45 text-indigo-600" />
          )}
        </button>

        <button 
          type="button"
          aria-label="Notifications"
          className="relative p-2 text-slate-500 hover:text-slate-800 transition-colors duration-300"
        >
          <Bell size={20} className="sm:w-[22px] sm:h-[22px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="relative" ref={ref}>
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 sm:gap-2"
            aria-label="User menu"
          >
            <img
              src={avatarUrl}
              alt="User avatar"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200 object-cover"
            />
            <ChevronDown
              size={15}
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
