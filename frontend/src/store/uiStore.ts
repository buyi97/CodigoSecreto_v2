import { create } from 'zustand';
import { UIState } from '../types/ui.types';

interface UIStore extends UIState {
  setTheme: (theme: 'light' | 'dark') => void;
  setBottomSheetOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setOrientation: (orientation: 'portrait' | 'landscape') => void;
}

export const useUIStore = create<UIStore>((set) => ({
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  isBottomSheetOpen: false,
  loading: false,
  error: null,
  orientation: 'portrait',
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },
  setBottomSheetOpen: (open) => set({ isBottomSheetOpen: open }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setOrientation: (orientation) => set({ orientation }),
}));