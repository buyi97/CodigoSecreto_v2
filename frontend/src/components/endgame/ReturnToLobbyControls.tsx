import React from 'react';
import { useGameActions } from '../../hooks/useGameActions';
import { useRoomStore } from '../../store/roomStore';
import { Button } from '../ui/Button';

export function ReturnToLobbyControls() {
  const { returnToLobby } = useGameActions();
  const { room, playerId } = useRoomStore();

  if (!room || !playerId) return null;

  const player = room.players.find(p => p.id === playerId);
  const isAdmin = player?.isAdmin;

  return (
    <div className="flex space-x-2">
      <Button onClick={returnToLobby}>
        Volver al Lobby
      </Button>
      {isAdmin && (
        <Button onClick={() => {}} variant="outline">
          Volver Todos
        </Button>
      )}
    </div>
  );
}