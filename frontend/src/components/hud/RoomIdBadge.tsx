import React from 'react';
import { Badge } from '../ui/Badge';

interface RoomIdBadgeProps {
  roomId: string;
}

export function RoomIdBadge({ roomId }: RoomIdBadgeProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}/sala=${roomId}`);
  };

  return (
    <Badge onClick={copyToClipboard} className="cursor-pointer">
      #{roomId}
    </Badge>
  );
}