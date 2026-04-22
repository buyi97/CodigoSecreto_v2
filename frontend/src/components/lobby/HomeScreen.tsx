import React, { useState } from 'react';
import { Button } from '../ui/Button'; // ".." para subir a components y entrar a ui
import { Input } from '../ui/Input';   // ".." para subir a components y entrar a ui
import { CreateRoomForm } from './CreateRoomForm'; // Estás en la misma carpeta (lobby)
import { JoinRoomForm } from './JoinRoomForm';     // Estás en la misma carpeta (lobby)

export function HomeScreen() {
  const [playerName, setPlayerName] = useState('');
  const [mode, setMode] = useState<'home' | 'create' | 'join'>('home');

  if (mode === 'create') {
    return <CreateRoomForm playerName={playerName} onBack={() => setMode('home')} />;
  }

  if (mode === 'join') {
    return <JoinRoomForm playerName={playerName} onBack={() => setMode('home')} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Codenames</h1>
      <div className="w-full max-w-md space-y-4">
        <Input
          placeholder="Tu nombre"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          maxLength={20}
        />
        <Button
          onClick={() => setMode('create')}
          disabled={!playerName.trim()}
          className="w-full"
        >
          Crear Sala
        </Button>
        <Button
          onClick={() => setMode('join')}
          disabled={!playerName.trim()}
          variant="outline"
          className="w-full"
        >
          Unirse a Sala
        </Button>
      </div>
    </div>
  );
}