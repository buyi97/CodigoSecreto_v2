import { create } from 'zustand';
import { Room, Player, GameConfig } from '../types/game.types';

interface RoomStore {
  room: Room | null;
  playerId: string | null;
  setRoom: (room: Room | null) => void;
  setPlayerId: (id: string | null) => void;
  updatePlayers: (players: Player[]) => void;
  updateConfig: (config: GameConfig) => void;
  updateHistory: (history: { redWins: number; blueWins: number }) => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
  room: null,
  playerId: null,
  setRoom: (room) => set({ room }),
  setPlayerId: (id) => set({ playerId: id }),
  updatePlayers: (players) =>
    set((state) => ({
      room: state.room ? { ...state.room, players } : null,
    })),
  updateConfig: (config) =>
    set((state) => ({
      room: state.room ? { ...state.room, config } : null,
    })),
  updateHistory: (history) =>
    set((state) => ({
      room: state.room ? { ...state.room, history } : null,
    })),
}));