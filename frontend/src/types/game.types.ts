export type Team = 'red' | 'blue';
export type Role = 'spymaster' | 'operative';
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
  attemptsLeft: number | null;
  isFirstTurn: boolean;
}

export interface GameConfig {
  turnTimeSeconds: number;
  firstTurnTimeSeconds: number;
  wordBank: string[];
  limitAttempts: boolean;
}

export interface Player {
  id: string;
  name: string;
  team: Team | null;
  role: Role | null;
  isAdmin: boolean;
  isConnected: boolean;
}

export interface Room {
  id: string;
  players: Player[];
  gameState: GameState | null;
  config: GameConfig;
  history: { redWins: number; blueWins: number };
  isPrivate: boolean;
}