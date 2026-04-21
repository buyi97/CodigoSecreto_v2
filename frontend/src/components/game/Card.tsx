import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { useRoomStore } from '../../store/roomStore';
import { useGameActions } from '../../hooks/useGameActions';
import { Card as CardType } from '../../types/game.types';

interface CardProps {
  card: CardType;
  index: number;
}

export function Card({ card, index }: CardProps) {
  const { gameState } = useGameStore();
  const { room, playerId } = useRoomStore();
  const { revealCard } = useGameActions();

  if (!gameState || !room || !playerId) return null;

  const player = room.players.find(p => p.id === playerId);
  if (!player) return null;

  const isSpymaster = player.role === 'spymaster';
  const isCurrentTeam = player.team === gameState.currentTeam;
  const isCurrentRole = player.role === gameState.currentRole;
  const canReveal = !card.revealed && isCurrentTeam && isCurrentRole && gameState.currentRole === 'operative';

  const handleClick = () => {
    if (canReveal) {
      revealCard(index);
    }
  };

  const getCardClass = () => {
    if (card.revealed) {
      switch (card.type) {
        case 'red': return 'bg-red-200 text-red-800';
        case 'blue': return 'bg-blue-200 text-blue-800';
        case 'neutral': return 'bg-gray-200 text-gray-800';
        case 'assassin': return 'bg-black text-white';
      }
    } else if (isSpymaster) {
      switch (card.type) {
        case 'red': return 'bg-red-100 border-red-300';
        case 'blue': return 'bg-blue-100 border-blue-300';
        case 'neutral': return 'bg-gray-100 border-gray-300';
        case 'assassin': return 'bg-gray-900 border-black text-white';
      }
    }
    return 'bg-white border-gray-300';
  };

  return (
    <div
      className={`aspect-square flex items-center justify-center border-2 rounded-lg p-2 text-center cursor-pointer transition-transform ${getCardClass()}`}
      onClick={handleClick}
      role="button"
      aria-label={`${card.word} - ${card.revealed ? card.type : 'oculta'}`}
    >
      <span className="text-sm font-medium">{card.word}</span>
    </div>
  );
}