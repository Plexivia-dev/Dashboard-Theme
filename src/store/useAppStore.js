import { create } from 'zustand';

/**
 * Global application state store.
 * Handles sidebar state, search, and user session.
 */
export const useAppStore = create((set) => ({
  activePortal: 'overview',
  setActivePortal: (portal) => set({ activePortal: portal }),

  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  isSearchModalOpen: false,
  setSearchModalOpen: (isOpen) => set({ isSearchModalOpen: isOpen }),

  user: null,
  setUser: (user) => set({ user }),
  logout: (keys = ['accessToken', 'refreshToken', 'user']) => {
    if (typeof window !== 'undefined') {
      keys.forEach((key) => localStorage.removeItem(key));
    }
    set({ user: null });
  },
}));

export default useAppStore;
