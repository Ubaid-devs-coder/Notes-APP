// Your backend stores note colors as hex codes (e.g. "#22C55E"), not names.
// This checks if the value is a valid hex color and returns it directly,
// with a safe fallback for old/blank values.
export const DEFAULT_NOTE_COLOR = "#F1F5F9"; // slate-100 equivalent

export const isValidHexColor = (color) => {
  return typeof color === "string" && /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color);
};

export const getNoteBackgroundColor = (color) => {
  return isValidHexColor(color) ? `${color}1A` : DEFAULT_NOTE_COLOR;
  // "1A" suffix = ~10% opacity in hex, so the card background stays soft/pastel
  // instead of a harsh solid color, matching the design's light-tint note cards
};
