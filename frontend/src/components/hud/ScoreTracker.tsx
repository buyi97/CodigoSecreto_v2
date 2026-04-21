import React from 'react';
import { useGameStore } from '../../store/gameStore';

export function ScoreTracker() {
  const { gameState } = useGameStore();

  if (!gameState) return null;

  return (
    <div className="flex items-center space-x-2">
      <span className="text-red-600">🔴 {gameState.remainingRed}/9</span>
      <span>|</span>
      <span className="text-blue-600">🔵 {gameState.remainingBlue}/8</span>
    </div>
  );
}