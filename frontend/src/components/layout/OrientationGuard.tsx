import React from 'react';
import { useUIStore } from '../../store/uiStore';

export function OrientationGuard() {
  const { orientation } = useUIStore();

  if (orientation === 'portrait') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="text-white text-center">
          <p>Por favor, rota tu dispositivo a landscape para una mejor experiencia.</p>
        </div>
      </div>
    );
  }

  return null;
}