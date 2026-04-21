import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { socketClient } from '../../utils/socketClient';

interface JoinRoomFormProps {
  playerName: string;
  onBack: () => void;
}

export function JoinRoomForm({ playerName, onBack }: JoinRoomFormProps) {
  const [roomId, setRoomId] = useState('');
  const [password, setPassword] = useState('');

  const handleJoin = () => {
    const socket = socketClient.getSocket();
    if (socket) {
      socket.emit('join_room', {
        roomId,
        name: playerName,
        password: password || undefined,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Unirse a Sala</h2>
      <div className="w-full max-w-md space-y-4">
        <Input
          placeholder="ID de Sala (4 dígitos)"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value.replace(/\D/g, '').slice(0, 4))}
        />
        <Input
          placeholder="Contraseña (si privada)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={handleJoin}
          disabled={roomId.length !== 4}
          className="w-full"
        >
          Unirse
        </Button>
        <Button onClick={onBack} variant="outline" className="w-full">
          Atrás
        </Button>
      </div>
    </div>
  );
}