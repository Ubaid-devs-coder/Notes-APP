import { Check } from "lucide-react";

// Fixed palette matching the design spec's note accent colors
const COLORS = [
  "#4F46E5", // indigo
  "#22C55E", // green
  "#F59E0B", // amber
  "#F43F5E", // rose
  "#A855F7", // purple
  "#64748B", // slate
];

// Pure, reusable — just renders swatches and reports the selected hex up via onChange
const ColorPicker = ({ selectedColor, onChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {COLORS.map((hex) => {
        const isSelected = selectedColor === hex;

        return (
          <button
            key={hex}
            type="button"
            onClick={() => onChange(hex)}
            aria-label={`Select color ${hex}`}
            aria-pressed={isSelected}
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ease-out hover:scale-110"
            style={{
              backgroundColor: hex,
              boxShadow: isSelected
                ? `0 0 0 3px white, 0 0 0 6px ${hex}`
                : "none",
            }}
          >
            {isSelected && (
              <Check size={18} className="text-white" strokeWidth={3} />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ColorPicker;
