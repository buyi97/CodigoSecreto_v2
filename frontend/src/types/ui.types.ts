export type Theme = 'light' | 'dark';

export interface UIState {
  theme: Theme;
  isBottomSheetOpen: boolean;
  loading: boolean;
  error: string | null;
  orientation: 'portrait' | 'landscape';
}