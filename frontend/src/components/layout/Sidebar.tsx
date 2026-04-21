import React from 'react';

interface SidebarProps {
  children: React.ReactNode;
  position: 'left' | 'right';
}

export function Sidebar({ children, position }: SidebarProps) {
  return (
    <div className={`fixed top-0 ${position}-0 h-full w-64 bg-white border-${position} p-4`}>
      {children}
    </div>
  );
}