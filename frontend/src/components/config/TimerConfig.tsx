import React from 'react';
import { useConfigStore } from '../../store/configStore';
import { Slider } from '../ui/Slider';
import { Input } from '../ui/Input';

export function TimerConfig() {
  const { config, setTimerConfig } = useConfigStore();

  return (
    <div className="space-y-4">
      <h4>Tiempo de Turno</h4>
      <Slider
        value={[config.turnTimeSeconds]}
        onValueChange={([value]) => setTimerConfig({ ...config, turnTimeSeconds: value })}
        min={10}
        max={600}
        step={10}
      />
      <span>{config.turnTimeSeconds} segundos</span>

      <h4>Tiempo del Primer Turno</h4>
      <Slider
        value={[config.firstTurnTimeSeconds]}
        onValueChange={([value]) => setTimerConfig({ ...config, firstTurnTimeSeconds: value })}
        min={10}
        max={300}
        step={10}
      />
      <span>{config.firstTurnTimeSeconds} segundos</span>
    </div>
  );
}