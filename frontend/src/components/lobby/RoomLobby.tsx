import React from 'react';
import { useRoomStore } from '../../store/roomStore';
import { useConfigStore } from '../../store/configStore';
import { PlayerList } from './PlayerList';
import { TeamAssignment } from './TeamAssignment';
import { GameConfigPanel } from '../config/GameConfigPanel';
import { Button } from '../ui/Button';
import { socketClient } from '../../utils/socketClient';

export function RoomLobby() {
  const { room, playerId } = useRoomStore();
  const { config } = useConfigStore();
  const socket = socketClient.getSocket();

  if (!room || !playerId) return null;

  const currentPlayer = room.players.find(p => p.id === playerId);
  const isAdmin = currentPlayer?.isAdmin;

  const handleStartGame = () => {
    if (socket && isAdmin) {
      socket.emit('start_game');
    }
  };

  const canStartGame = isAdmin && room.players.filter(p => p.team === 'red').length > 0 &&
    room.players.filter(p => p.team === 'blue').length > 0 &&
    room.players.some(p => p.team === 'red' && p.role === 'spymaster') &&
    room.players.some(p => p.team === 'blue' && p.role === 'spymaster');

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Sala #{room.id}</h2>
        <p>{room.players.length} jugadores</p>
      </div>

      <PlayerList />
      <TeamAssignment />

      {isAdmin && <GameConfigPanel />}

      {isAdmin && (
        <Button
          onClick={handleStartGame}
          disabled={!canStartGame}
          className="w-full"
        >
          Iniciar Partida
        </Button>
      )}
    </div>
  );
}