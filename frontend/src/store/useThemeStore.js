import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("lexconnect-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("lexconnect-theme", theme);
    set({ theme });
  },
}));
