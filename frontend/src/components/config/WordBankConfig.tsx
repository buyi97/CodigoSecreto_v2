import React, { useState } from 'react';
import { useConfigStore } from '../../store/configStore';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { Switch } from '../ui/Switch';

export function WordBankConfig() {
  const { config, setWordBankConfig } = useConfigStore();
  const [replaceMode, setReplaceMode] = useState(false);
  const [words, setWords] = useState('');

  const handleAddWords = () => {
    const newWords = words.split(/[\n,]+/).map(w => w.trim()).filter(w => w);
    setWordBankConfig({ ...config, wordBank: [...config.wordBank, ...newWords] });
    setWords('');
  };

  const handleReplaceWords = () => {
    const newWords = words.split(/[\n,]+/).map(w => w.trim()).filter(w => w);
    if (newWords.length >= 25) {
      setWordBankConfig({ ...config, wordBank: newWords });
      setWords('');
    }
  };

  return (
    <div className="space-y-4">
      <h4>Banco de Palabras</h4>
      <div className="flex items-center space-x-2">
        <Switch checked={replaceMode} onCheckedChange={setReplaceMode} />
        <label>Modo Reemplazar</label>
      </div>

      <Textarea
        placeholder={replaceMode ? "Nuevo banco completo (mín 25 palabras)" : "Palabras adicionales"}
        value={words}
        onChange={(e) => setWords(e.target.value)}
      />

      <Button
        onClick={replaceMode ? handleReplaceWords : handleAddWords}
        disabled={!words.trim()}
      >
        {replaceMode ? 'Reemplazar' : 'Agregar'}
      </Button>
    </div>
  );
}