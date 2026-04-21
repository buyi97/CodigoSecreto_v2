import React from 'react';
import { useConfigStore } from '../../store/configStore';
import { Switch } from '../ui/Switch';

export function RuleConfig() {
  const { config, setRuleConfig } = useConfigStore();

  return (
    <div className="space-y-4">
      <h4>Reglas</h4>
      <div className="flex items-center space-x-2">
        <Switch
          checked={config.limitAttempts}
          onCheckedChange={(checked) => setRuleConfig({ limitAttempts: checked })}
        />
        <label>Límite de Intentos</label>
      </div>
      <p className="text-sm text-gray-600">
        Si activado, los agentes pueden adivinar hasta N+1 palabras por turno.
      </p>
    </div>
  );
}