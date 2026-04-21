import React from 'react';
import { TimerConfig } from './TimerConfig';
import { WordBankConfig } from './WordBankConfig';
import { RuleConfig } from './RuleConfig';

export function GameConfigPanel() {
  return (
    <div className="space-y-6 p-4 border rounded-lg">
      <h3 className="font-semibold">Configuración de Partida</h3>
      <TimerConfig />
      <WordBankConfig />
      <RuleConfig />
    </div>
  );
}