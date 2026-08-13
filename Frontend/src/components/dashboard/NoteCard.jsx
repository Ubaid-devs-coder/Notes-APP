import {
  Pin,
  MoreVertical,
  Pencil,
  Archive,
  Trash2,
} from "lucide-react";

import { formatRelativeDate } from "../../utils/formatDate.js";
import { getNoteBackgroundColor } from "../../utils/constants.js";
import useDropdown from "../../hooks/useDropdown.js";

const NoteCard = ({
  note,
  onEdit,
  onPin,
  onArchive,
  onTrash,
  onRestore,
  onDeleteForever,
}) => {
  const {
    ref,
    isOpen: menuOpen,
    toggle,
    close,
  } = useDropdown(`note-menu-${note._id}`);

  const {
    title,
    content,
    category,
    color,
    isPinned,
    isArchived,
    updatedAt,
  } = note;

  return (
    <div
      style={{
        backgroundColor: getNoteBackgroundColor(color),
      }}
      className={`
        relative
        rounded-2xl
        p-5
        border border-slate-100
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all duration-300
        cursor-pointer
        overflow-visible
        ${menuOpen ? "z-50" : "z-0"}
      `}
    >
      {/* TOP ROW */}
      <div className="flex items-start justify-between mb-3">
        {/* Category */}
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/70 text-slate-700">
          {category || "General"}
        </span>

        {/* Right Side */}
        <div className="relative flex items-center gap-2">
          {/* Pin */}
          {isPinned && (
            <Pin
              size={16}
              className="text-indigo-600 fill-indigo-600"
            />
          )}

          {/* Edit Button */}
          {!note.isTrashed && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(note);
              }}
              title="Edit Note"
              className="
                inline-flex
                items-center
                justify-center
                w-9
                h-9
                rounded-2xl
                text-slate-500
                hover:text-slate-800
                hover:bg-white/90
                transition-all duration-200
              "
            >
              <Pencil size={16} />
            </button>
          )}

          {/* THREE DOT MENU */}
          <div ref={ref} className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
              className="
                inline-flex
                items-center
                justify-center
                w-9
                h-9
                rounded-2xl
                text-slate-500
                hover:text-slate-800
                hover:bg-white/90
                transition-all duration-200
              "
            >
              <MoreVertical size={18} />
            </button>

            {/* DROPDOWN MENU */}
            {menuOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-full
                  mt-2
                  w-48
                  bg-white
                  rounded-xl
                  shadow-xl
                  border
                  border-slate-200
                  z-50
                  overflow-hidden
                "
                onClick={(e) => e.stopPropagation()}
              >
                {!note.isTrashed ? (
                  <>
                    {/* Edit */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        close();
                        onEdit?.(note);
                      }}
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-sm
                        text-slate-700
                        hover:bg-slate-50
                        transition-colors
                      "
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    {/* Pin / Unpin */}
                    <button
                      type="button"
                      onClick={async (e) => {
                        e.stopPropagation();
                        const success = await onPin?.(note);
                        if (success !== false) {
                          close();
                        }
                      }}
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-sm
                        text-slate-700
                        hover:bg-slate-50
                        transition-colors
                      "
                    >
                      <Pin size={16} />
                      {isPinned ? "Unpin" : "Pin"}
                    </button>

                    {/* Archive / Unarchive */}
                    <button
                      type="button"
                      onClick={async (e) => {
                        e.stopPropagation();
                        const success = await onArchive?.(note);
                        if (success !== false) {
                          close();
                        }
                      }}
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-sm
                        text-slate-700
                        hover:bg-slate-50
                        transition-colors
                      "
                    >
                      <Archive size={16} />
                      {isArchived ? "Unarchive" : "Archive"}
                    </button>

                    {/* Move To Trash */}
                    <button
                      type="button"
                      onClick={async (e) => {
                        e.stopPropagation();
                        const success = await onTrash?.(note);
                        if (success !== false) {
                          close();
                        }
                      }}
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-sm
                        text-red-500
                        hover:bg-red-50
                        transition-colors
                      "
                    >
                      <Trash2 size={16} />
                      Move to Trash
                    </button>
                  </>
                ) : (
                  <>
                    {/* Restore */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        close();
                        onRestore?.(note);
                      }}
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-sm
                        text-slate-700
                        hover:bg-slate-50
                        transition-colors
                      "
                    >
                      <Archive size={16} />
                      Restore
                    </button>

                    {/* Delete Forever */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        close();
                        onDeleteForever?.(note);
                      }}
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-sm
                        text-red-500
                        hover:bg-red-50
                        transition-colors
                      "
                    >
                      <Trash2 size={16} />
                      Delete Forever
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TITLE */}
      <h3 className="text-base font-bold text-slate-900 mb-1.5 truncate">
        {title || "Untitled Note"}
      </h3>

      {/* CONTENT */}
      <p className="text-sm text-slate-600 line-clamp-3 mb-4">
        {content}
      </p>

      {/* UPDATED TIME */}
      <p className="text-xs text-slate-500">
        {formatRelativeDate(updatedAt)}
      </p>
    </div>
  );
};

export default NoteCard;