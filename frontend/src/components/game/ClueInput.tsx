import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { useRoomStore } from '../../store/roomStore';
import { useGameActions } from '../../hooks/useGameActions';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function ClueInput() {
  const { gameState } = useGameStore();
  const { room, playerId } = useRoomStore();
  const { submitClue } = useGameActions();
  const [word, setWord] = useState('');
  const [number, setNumber] = useState(1);

  if (!gameState || !room || !playerId) return null;

  const player = room.players.find(p => p.id === playerId);
  const canSubmit = player?.role === 'spymaster' && player.team === gameState.currentTeam && gameState.currentRole === 'spymaster';

  const handleSubmit = () => {
    if (word.trim()) {
      submitClue(word.trim(), number);
      setWord('');
      setNumber(1);
    }
  };

  if (!canSubmit) return null;

  return (
    <div className="flex space-x-2 p-4">
      <Input
        placeholder="Pista"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <Input
        type="number"
        min={0}
        max={9}
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
        className="w-20"
      />
      <Button onClick={handleSubmit} disabled={!word.trim()}>
        Enviar
      </Button>
    </div>
  );
}