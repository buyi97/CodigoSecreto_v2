import React from 'react';
import { useRoomStore } from '../../store/roomStore';
import { Badge } from '../ui/Badge';

export function RoleTag() {
  const { room, playerId } = useRoomStore();

  if (!room || !playerId) return null;

  const player = room.players.find(p => p.id === playerId);
  if (!player) return null;

  return (
    <Badge variant={player.team === 'red' ? 'destructive' : 'default'}>
      {player.team} - {player.role}
    </Badge>
  );
}