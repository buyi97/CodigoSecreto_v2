import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { useRoomStore } from '../../store/roomStore';
import { useGameActions } from '../../hooks/useGameActions';
import { Button } from '../ui/Button';

export function EndGameOverlay() {
  const { gameState } = useGameStore();
  const { room, playerId } = useRoomStore();
  const { returnToLobby } = useGameActions();

  if (!gameState || gameState.status !== 'finished' || !room || !playerId) return null;

  const player = room.players.find(p => p.id === playerId);
  const isAdmin = player?.isAdmin;

  const winnerText = gameState.winner ? `¡Ganó el equipo ${gameState.winner === 'red' ? 'Rojo' : 'Azul'}!` : 'Partida terminada';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-4">{winnerText}</h2>
        <div className="space-y-2">
          <Button onClick={returnToLobby} className="w-full">
            Volver al Lobby
          </Button>
          {isAdmin && (
            <Button onClick={() => {}} variant="outline" className="w-full">
              Volver Todos al Lobby
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}