export interface ServerToClientEvents {
  'game:full_state': (payload: Room) => void;
  'card:revealed': (payload: { cardIndex: number; team: string; remainingRed: number; remainingBlue: number; timerBonus: number }) => void;
  'turn:changed': (payload: { team: string; role: string; timeLimit: number }) => void;
  'clue:submitted': (payload: { word: string; number: number }) => void;
  'game:over': (payload: { winner: string | null; reason: string }) => void;
  'room:return_to_lobby': () => void;
  'words:bank_depleted': () => void;
  'config:locked': () => void;
  'config:unlocked': () => void;
  'error': (message: string) => void;
}

export interface ClientToServerEvents {
  'create_room': (data: { name: string; isPrivate: boolean; password?: string }) => void;
  'join_room': (data: { roomId: string; name: string; password?: string }) => void;
  'rejoin_room': (data: { roomId: string; playerId: string }) => void;
  'assign_team': (data: { playerId: string; team: string }) => void;
  'assign_role': (data: { playerId: string; role: string }) => void;
  'update_config': (data: Partial<GameConfig>) => void;
  'start_game': () => void;
  'submit_clue': (data: { word: string; number: number }) => void;
  'reveal_card': (data: { cardIndex: number }) => void;
  'pass_turn': () => void;
  'end_game': () => void;
  'return_to_lobby': () => void;
  'add_custom_words': (data: { words: string[] }) => void;
  'replace_word_bank': (data: { words: string[] }) => void;
}

import { Room, GameConfig } from './game.types';