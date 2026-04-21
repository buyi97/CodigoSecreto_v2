import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Switch } from '../ui/Switch';
import { socketClient } from '../../utils/socketClient';

interface CreateRoomFormProps {
  playerName: string;
  onBack: () => void;
}

export function CreateRoomForm({ playerName, onBack }: CreateRoomFormProps) {
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState('');

  const handleCreate = () => {
    const socket = socketClient.getSocket();
    if (socket) {
      socket.emit('create_room', {
        name: playerName,
        isPrivate,
        password: isPrivate ? password : undefined,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Crear Sala</h2>
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center space-x-2">
          <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
          <label>Sala Privada</label>
        </div>
        {isPrivate && (
          <Input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={4}
          />
        )}
        <Button
          onClick={handleCreate}
          disabled={isPrivate && password.length < 4}
          className="w-full"
        >
          Crear
        </Button>
        <Button onClick={onBack} variant="outline" className="w-full">
          Atrás
        </Button>
      </div>
    </div>
  );
}