import { useCallback, useEffect, useRef, useState } from "react";

const dropdownManager = {
  activeId: null,
  listeners: new Map(),

  register(id, close) {
    this.listeners.set(id, close);
  },

  unregister(id) {
    if (this.activeId === id) {
      this.activeId = null;
    }
    this.listeners.delete(id);
  },

  setActive(id) {
    if (this.activeId && this.activeId !== id) {
      this.listeners.get(this.activeId)?.();
    }
    this.activeId = id;
  },

  clearActive(id) {
    if (this.activeId === id) {
      this.activeId = null;
    }
  },
};

const useDropdown = (id, { onClose } = {}) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
    if (typeof onClose === "function") {
      onClose();
    }
  }, [onClose]);

  const open = useCallback(() => setIsOpen(true), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    if (!id) return undefined;

    dropdownManager.register(id, close);

    return () => {
      dropdownManager.unregister(id);
    };
  }, [close, id]);

  useEffect(() => {
    if (!id) return;

    if (isOpen) {
      dropdownManager.setActive(id);
    } else {
      dropdownManager.clearActive(id);
    }
  }, [id, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleDocumentClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("touchstart", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("touchstart", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, isOpen]);

  return {
    ref,
    isOpen,
    open,
    close,
    toggle,
  };
};

export default useDropdown;
