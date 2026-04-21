import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Card } from './Card';

export function Board() {
  const { gameState } = useGameStore();

  if (!gameState) return null;

  return (
    <div className="grid grid-cols-5 gap-2 p-4">
      {gameState.cards.map((card, index) => (
        <Card key={index} card={card} index={index} />
      ))}
    </div>
  );
}