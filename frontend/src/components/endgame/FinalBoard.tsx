import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Card } from '../game/Card';

export function FinalBoard() {
  const { gameState } = useGameStore();

  if (!gameState || gameState.status !== 'finished') return null;

  return (
    <div className="grid grid-cols-5 gap-2 p-4 opacity-50">
      {gameState.cards.map((card, index) => (
        <Card key={index} card={card} index={index} />
      ))}
    </div>
  );
}