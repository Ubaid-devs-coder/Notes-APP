import { useState } from "react";
import { Plus } from "lucide-react";

const FloatingButton = ({ onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-30 lg:bottom-8 lg:right-8">
      {showTooltip && (
        <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900 dark:bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-md border border-slate-700/50">
          Create Note
        </span>
      )}

      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Create note"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <Plus size={26} />
      </button>
    </div>
  );
};

export default FloatingButton;
