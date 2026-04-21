import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { useRoomStore } from '../../store/roomStore';

export function TeamStatus() {
  const { gameState } = useGameStore();
  const { room, playerId } = useRoomStore();

  if (!gameState || !room || !playerId) return null;

  const player = room.players.find(p => p.id === playerId);
  if (!player) return null;

  return (
    <div className="text-sm">
      Turno: {gameState.currentTeam === 'red' ? 'Rojo' : 'Azul'} - {gameState.currentRole}
    </div>
  );
}