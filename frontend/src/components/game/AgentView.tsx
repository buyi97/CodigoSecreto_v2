import React from 'react';
import { Board } from './Board';
import { ClueHistory } from './ClueHistory';
import { Button } from '../ui/Button';
import { useGameActions } from '../../hooks/useGameActions';

export function AgentView() {
  const { passTurn } = useGameActions();

  return (
    <div className="space-y-4">
      <Board />
      <ClueHistory />
      <Button onClick={passTurn} className="w-full">
        Pasar Turno
      </Button>
    </div>
  );
}