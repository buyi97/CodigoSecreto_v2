import React from 'react';
import { useUIStore } from '../../store/uiStore';

interface BottomSheetProps {
  children: React.ReactNode;
}

export function BottomSheet({ children }: BottomSheetProps) {
  const { isBottomSheetOpen } = useUIStore();

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t transition-transform ${isBottomSheetOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}