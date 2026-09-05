import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.js";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { user, updateProfile } = useAuth();

  const [theme, setThemeState] = useState(() => {
    // 1. Check localStorage first
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      return saved;
    }
    // 2. Check system preference
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  });

  // Apply/remove .dark class on <html> documentElement
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Sync with user's saved DB profile when logged in
  useEffect(() => {
    if (user && typeof user.darkMode === "boolean") {
      const dbTheme = user.darkMode ? "dark" : "light";
      const localTheme = localStorage.getItem("theme");
      if (!localTheme) {
        setThemeState(dbTheme);
      }
    }
  }, [user]);

  const toggleTheme = async () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setThemeState(nextTheme);

    // Save to user profile in backend if authenticated
    if (user && updateProfile) {
      try {
        await updateProfile({ darkMode: nextTheme === "dark" });
      } catch {
        // Ignore network errors; local state is already applied
      }
    }
  };

  const setTheme = async (newTheme) => {
    if (newTheme !== "dark" && newTheme !== "light") return;
    setThemeState(newTheme);

    if (user && updateProfile) {
      try {
        await updateProfile({ darkMode: newTheme === "dark" });
      } catch {
        // Ignore
      }
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === "dark",
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
