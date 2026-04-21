import React from 'react';
import { useRoomStore } from '../../store/roomStore';
import { Badge } from '../ui/Badge';

export function PlayerList() {
  const { room } = useRoomStore();

  if (!room) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Jugadores</h3>
      <div className="space-y-1">
        {room.players.map(player => (
          <div key={player.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
            <span>{player.name}</span>
            <div className="flex space-x-1">
              {player.isAdmin && <Badge>Admin</Badge>}
              {player.team && <Badge variant={player.team === 'red' ? 'destructive' : 'default'}>{player.team}</Badge>}
              {player.role && <Badge variant="outline">{player.role}</Badge>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}