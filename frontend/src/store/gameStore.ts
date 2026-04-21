import { create } from 'zustand';
import { GameState, Card } from '../types/game.types';

interface GameStore {
  gameState: GameState | null;
  setGameState: (state: GameState | null) => void;
  revealCard: (cardIndex: number, team: string, remainingRed: number, remainingBlue: number) => void;
  updateTurn: (team: string, role: string) => void;
  setClue: (word: string, number: number) => void;
  endGame: (winner: string | null, reason: string) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  gameState: null,
  setGameState: (state) => set({ gameState: state }),
  revealCard: (cardIndex, team, remainingRed, remainingBlue) =>
    set((state) => {
      if (!state.gameState) return state;
      const newCards = [...state.gameState.cards];
      newCards[cardIndex] = { ...newCards[cardIndex], revealed: true };
      return {
        gameState: {
          ...state.gameState,
          cards: newCards,
          remainingRed,
          remainingBlue,
        },
      };
    }),
  updateTurn: (team, role) =>
    set((state) => ({
      gameState: state.gameState ? { ...state.gameState, currentTeam: team as any, currentRole: role as any } : null,
    })),
  setClue: (word, number) =>
    set((state) => ({
      gameState: state.gameState ? { ...state.gameState, clue: { word, number } } : null,
    })),
  endGame: (winner, reason) =>
    set((state) => ({
      gameState: state.gameState ? { ...state.gameState, status: 'finished', winner: winner as any } : null,
    })),
}));