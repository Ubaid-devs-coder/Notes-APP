import { useState } from "react";
import { Plus } from "lucide-react";

const FloatingButton = ({ onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-24 right-5 z-30 lg:bottom-8 lg:right-8">
      {showTooltip && (
        <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg">
          Create Note
        </span>
      )}

      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg shadow-indigo-300 hover:scale-110 transition-all duration-300"
      >
        <Plus size={26} />
      </button>
    </div>
  );
};

export default FloatingButton;
