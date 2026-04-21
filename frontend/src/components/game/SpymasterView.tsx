import React from 'react';
import { Board } from './Board';
import { ClueInput } from './ClueInput';

export function SpymasterView() {
  return (
    <div className="space-y-4">
      <Board />
      <ClueInput />
    </div>
  );
}