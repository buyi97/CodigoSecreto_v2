import { Player } from './Player';
import { GameState } from './GameState';
import { GameConfig } from './GameConfig';
import { WordTracker } from '../utils/wordTracker';
import { TimerManager } from '../utils/timerManager';

export interface Room {
  id: string;
  passwordHash: string | null;
  players: Map<string, Player>;
  gameState: GameState | null;
  config: GameConfig;
  wordTracker: WordTracker;
  timerManager: TimerManager;
  history: { redWins: number; blueWins: number };
  createdAt: Date;
  lastActivity: Date;
}