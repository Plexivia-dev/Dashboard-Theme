import { create } from 'zustand';

const THEME_KEY = 'erp_theme';

export const useThemeStore = create((set, get) => ({
  theme: 'light',
  isDark: false,
  setTheme: (newTheme) => {
    const isDark = newTheme === 'dark';
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDark);
      localStorage.setItem(THEME_KEY, newTheme);
    }
    set({ theme: newTheme, isDark });
  },
  toggleTheme: () => {
    const next = get().theme === 'light' ? 'dark' : 'light';
    get().setTheme(next);
  },
  initTheme: (themeKey = THEME_KEY) => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(themeKey) || 'light';
      const isDark = stored === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
      set({ theme: stored, isDark });
    }
  },
}));

export const useTheme = useThemeStore;
export default useThemeStore;
