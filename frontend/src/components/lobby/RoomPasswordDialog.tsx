import React, { useState } from 'react';
import { Dialog } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface RoomPasswordDialogProps {
  isOpen: boolean;
  onConfirm: (password: string) => void;
  onCancel: () => void;
}

export function RoomPasswordDialog({ isOpen, onConfirm, onCancel }: RoomPasswordDialogProps) {
  const [password, setPassword] = useState('');

  const handleConfirm = () => {
    onConfirm(password);
    setPassword('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Sala Privada</h3>
        <Input
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        <div className="flex justify-end space-x-2 mt-4">
          <Button onClick={onCancel} variant="outline">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={!password}>
            Unirse
          </Button>
        </div>
      </div>
    </Dialog>
  );
}