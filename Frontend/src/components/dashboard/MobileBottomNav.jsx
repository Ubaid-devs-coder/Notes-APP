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
    // hidden on large screens
    <nav className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="mx-4 mb-4">
        <div className="backdrop-blur-sm bg-white/95 border-t border-slate-200 rounded-t-2xl shadow-lg py-3 px-3 flex items-center justify-between gap-2">
          {items.map((item) => {
            const Icon = item.icon;
            const active = activeView === item.view;

            return (
              <button
                key={item.key}
                onClick={() => handleClick(item.view)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-lg transition-all duration-200 ${
                  active ? "text-indigo-600" : "text-slate-500"
                }`}
              >
                <div
                  className={`p-2 rounded-full transition-transform duration-200 ${
                    active ? "scale-110 bg-indigo-50" : "bg-transparent"
                  }`}
                >
                  <Icon size={20} className={`${active ? "text-indigo-600" : "text-slate-500"}`} />
                </div>
                <span className="text-[11px] mt-1 hidden sm:block">{item.label}</span>
                {active && <span className="w-6 h-1 bg-indigo-600 rounded-full mt-2" />}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
