import { Team, Role } from './Player';

export type CardType = 'red' | 'blue' | 'neutral' | 'assassin';

export interface Card {
  word: string;
  type: CardType;
  revealed: boolean;
}

export interface GameState {
  cards: Card[];
  currentTeam: Team;
  currentRole: Role;
  remainingRed: number;
  remainingBlue: number;
  status: 'waiting' | 'in_progress' | 'finished';
  winner: Team | null;
  clue: { word: string; number: number } | null;
  attemptsLeft: number | null; // null if no limit
  isFirstTurn: boolean;
}