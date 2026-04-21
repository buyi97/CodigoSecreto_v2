import React from 'react';
import { useGameStore } from '../../store/gameStore';

export function ClueHistory() {
  const { gameState } = useGameStore();

  if (!gameState?.clue) return null;

  return (
    <div className="p-4">
      <h4 className="font-semibold">Pista Actual</h4>
      <p>{gameState.clue.word} - {gameState.clue.number}</p>
    </div>
  );
}