import React from 'react';
import { useRoomStore } from '../../store/roomStore';
import { useGameStore } from '../../store/gameStore';
import { useUIStore } from '../../store/uiStore';
import { TurnTimer } from './TurnTimer';
import { ScoreTracker } from './ScoreTracker';
import { RoomIdBadge } from './RoomIdBadge';
import { Button } from '../ui/Button';
import { useTheme } from '../../hooks/useTheme';

export function GameBar() {
  const { room } = useRoomStore();
  const { gameState } = useGameStore();
  const { theme, toggleTheme } = useTheme();

  if (!room || !gameState) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b p-2 flex items-center justify-between z-50">
      <div className="flex items-center space-x-4">
        <RoomIdBadge roomId={room.id} />
        <ScoreTracker />
      </div>

      <div className="flex items-center space-x-4">
        <TurnTimer />
        <Button onClick={toggleTheme} size="sm">
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>
      </div>
    </div>
  );
}