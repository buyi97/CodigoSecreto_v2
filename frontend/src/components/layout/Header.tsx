import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../ui/Button';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="p-4 border-b">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Codenames</h1>
        <Button onClick={toggleTheme} size="sm">
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>
      </div>
    </header>
  );
}