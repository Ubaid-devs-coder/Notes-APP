import { useEffect, useState } from "react";
import { Pin, Save } from "lucide-react";
import ColorPicker from "./ColorPicker.jsx";

const CATEGORIES = ["Personal", "Study", "Work", "Ideas"];

// Pure form component — holds its own field state, validates, and calls
// onSubmit(formData) when the user submits a valid form.
// Knows nothing about modals, contexts, or APIs — fully reusable.
const NoteForm = ({ onSubmit, onCancel, loading, initialData, submitLabel = "Save Note" }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    category: initialData?.category || "Personal",
    color: initialData?.color || "#4F46E5",
    isPinned: initialData?.isPinned || false,
    imagePreview: initialData?.imagePreview || null,
    imageFile: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear the field's error as soon as the user starts fixing it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, imagePreview: reader.result, imageFile: file }));
    };
    reader.readAsDataURL(file);
  };

  const handleColorChange = (hex) => {
    setFormData((prev) => ({ ...prev, color: hex }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.content.trim()) newErrors.content = "Content is required.";

    setErrors(newErrors);

    // Valid if no error keys were set
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      title: initialData.title || "",
      content: initialData.content || "",
      category: initialData.category || "Personal",
      color: initialData.color || "#4F46E5",
      isPinned: initialData.isPinned || false,
      imagePreview: initialData.imagePreview || null,
      imageFile: null,
    });
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block mb-2 text-sm font-semibold text-slate-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter note title"
          className={`w-full h-12 px-4 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 outline-none shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.title
              ? "border-red-400"
              : "border-slate-300 hover:border-slate-400"
          }`}
        />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1.5">{errors.title}</p>
        )}
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block mb-2 text-sm font-semibold text-slate-700">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your note here..."
          className={`w-full h-32 px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 outline-none shadow-sm transition-all duration-200 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.content
              ? "border-red-400"
              : "border-slate-300 hover:border-slate-400"
          }`}
        />
        {errors.content && (
          <p className="text-xs text-red-500 mt-1.5">{errors.content}</p>
        )}
      </div>

    

      {/* Category + Color — side by side, aligned to the same baseline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block mb-2 text-sm font-semibold text-slate-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-300 hover:border-slate-400 text-sm text-slate-900 outline-none shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Color
          </label>
          <div className="h-12 flex items-center">
            <ColorPicker selectedColor={formData.color} onChange={handleColorChange} />
          </div>
        </div>
      </div>

      {/* Pin Note */}
      <label className="flex items-center gap-2.5 cursor-pointer select-none w-fit">
        <input
          type="checkbox"
          name="isPinned"
          checked={formData.isPinned}
          onChange={handleChange}
          className="w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        />
        <Pin size={15} className="text-slate-500" />
        <span className="text-sm font-medium text-slate-700">Pin this note</span>
      </label>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200 mt-1">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="h-12 px-7 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 hover:border-slate-400 transition-colors duration-200 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 h-12 px-7 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <Save size={16} />
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
