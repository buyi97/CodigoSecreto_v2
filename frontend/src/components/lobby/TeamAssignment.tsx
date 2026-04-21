import React from 'react';
import { useRoomStore } from '../../store/roomStore';
import { Button } from '../ui/Button';
import { socketClient } from '../../utils/socketClient';

export function TeamAssignment() {
  const { room, playerId } = useRoomStore();
  const socket = socketClient.getSocket();

  if (!room || !playerId) return null;

  const currentPlayer = room.players.find(p => p.id === playerId);
  const isAdmin = currentPlayer?.isAdmin;

  if (!isAdmin) return null;

  const assignTeam = (playerId: string, team: 'red' | 'blue') => {
    if (socket) {
      socket.emit('assign_team', { playerId, team });
    }
  };

  const assignRole = (playerId: string, role: 'spymaster' | 'operative') => {
    if (socket) {
      socket.emit('assign_role', { playerId, role });
    }
  };

  const redPlayers = room.players.filter(p => p.team === 'red');
  const bluePlayers = room.players.filter(p => p.team === 'blue');
  const unassigned = room.players.filter(p => !p.team);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Asignar Equipos</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-red-600 font-medium">Equipo Rojo</h4>
          {redPlayers.map(player => (
            <div key={player.id} className="flex items-center justify-between">
              <span>{player.name}</span>
              <Button
                size="sm"
                variant={player.role === 'spymaster' ? 'default' : 'outline'}
                onClick={() => assignRole(player.id, player.role === 'spymaster' ? 'operative' : 'spymaster')}
              >
                {player.role === 'spymaster' ? 'Spy' : 'Op'}
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h4 className="text-blue-600 font-medium">Equipo Azul</h4>
          {bluePlayers.map(player => (
            <div key={player.id} className="flex items-center justify-between">
              <span>{player.name}</span>
              <Button
                size="sm"
                variant={player.role === 'spymaster' ? 'default' : 'outline'}
                onClick={() => assignRole(player.id, player.role === 'spymaster' ? 'operative' : 'spymaster')}
              >
                {player.role === 'spymaster' ? 'Spy' : 'Op'}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4>Sin asignar</h4>
        {unassigned.map(player => (
          <div key={player.id} className="flex items-center space-x-2">
            <span>{player.name}</span>
            <Button size="sm" onClick={() => assignTeam(player.id, 'red')}>Rojo</Button>
            <Button size="sm" onClick={() => assignTeam(player.id, 'blue')}>Azul</Button>
          </div>
        ))}
      </div>
    </div>
  );
}