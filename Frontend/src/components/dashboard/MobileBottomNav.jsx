import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Settings, Trash2, User } from "lucide-react";

const items = [
  { key: "recent", label: "Home", icon: LayoutDashboard, view: "recent" },
  { key: "all", label: "All", icon: FileText, view: "all" },
  { key: "settings", label: "Settings", icon: Settings, view: "settings" },
  { key: "trash", label: "Trash", icon: Trash2, view: "trash" },
  { key: "profile", label: "Profile", icon: User, view: "profile" },
];

const MobileBottomNav = ({ activeView, onChangeView }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (view) => {
    onChangeView?.(view);
    // keep routing consistent with existing app behavior (dashboard single route)
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 lg:hidden pointer-events-none">
      <div className="max-w-md mx-auto px-3 pb-2.5 sm:pb-4 pointer-events-auto">
        <div className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xl dark:shadow-2xl py-1.5 px-2 flex items-center justify-between gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = activeView === item.view;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleClick(item.view)}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-200 relative ${
                  active
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                <div
                  className={`p-1.5 rounded-xl transition-all duration-200 ${
                    active
                      ? "scale-105 bg-indigo-50 dark:bg-indigo-950/60 shadow-xs"
                      : "bg-transparent hover:bg-slate-100/60 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <Icon
                    size={20}
                    className={active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400"}
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] mt-0.5 tracking-tight">{item.label}</span>
                {active && (
                  <span className="w-4 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
