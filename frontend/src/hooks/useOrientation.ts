import { useEffect } from 'react';
import { useUIStore } from '../store/uiStore';

export function useOrientation() {
  const { setOrientation } = useUIStore();

  useEffect(() => {
    const updateOrientation = () => {
      const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
      setOrientation(orientation);
    };

    updateOrientation();
    window.addEventListener('resize', updateOrientation);
    window.addEventListener('orientationchange', updateOrientation);

    return () => {
      window.removeEventListener('resize', updateOrientation);
      window.removeEventListener('orientationchange', updateOrientation);
    };
  }, [setOrientation]);
}