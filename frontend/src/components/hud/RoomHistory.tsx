import React from 'react';
import { useRoomStore } from '../../store/roomStore';

export function RoomHistory() {
  const { room } = useRoomStore();

  if (!room) return null;

  return (
    <div className="text-sm">
      🔴 {room.history.redWins} — {room.history.blueWins} 🔵
    </div>
  );
}