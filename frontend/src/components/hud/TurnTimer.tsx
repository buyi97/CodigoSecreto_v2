import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';

export function TurnTimer() {
  const { gameState } = useGameStore();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Simular timer, en realidad vendría del backend
    if (gameState?.status === 'in_progress') {
      setTimeLeft(90); // placeholder
    }
  }, [gameState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-lg font-mono">
      {formatTime(timeLeft)}
    </div>
  );
}