import { GameState, Card } from '../models/GameState';
import { GameConfig } from '../models/GameConfig';
import { Team, Role } from '../models/Player';
import { generateBoard } from './boardGenerator';
import { TIMER_BONUS_ON_CORRECT } from './constants';

export type GameError =
  | { type: 'invalid_turn' }
  | { type: 'card_already_revealed' }
  | { type: 'game_not_in_progress' }
  | { type: 'invalid_clue' }
  | { type: 'attempts_exceeded' };

export type GameEffect =
  | { type: 'emit'; event: string; payload: any }
  | { type: 'timer_add'; seconds: number }
  | { type: 'timer_start'; seconds: number }
  | { type: 'timer_reset' };

export type Result<T, E> = { success: true; value: T } | { success: false; error: E };

export class GameService {
  static createGame(config: GameConfig, wordBank: string[]): Result<GameState, GameError> {
    try {
      const cards = generateBoard(wordBank);
      const startingTeam: Team = Math.random() < 0.5 ? 'red' : 'blue';
      const remainingRed = cards.filter(c => c.type === 'red').length;
      const remainingBlue = cards.filter(c => c.type === 'blue').length;

      const gameState: GameState = {
        cards,
        currentTeam: startingTeam,
        currentRole: 'spymaster',
        remainingRed,
        remainingBlue,
        status: 'in_progress',
        winner: null,
        clue: null,
        attemptsLeft: config.limitAttempts ? null : null, // if limit, set later
        isFirstTurn: true,
      };

      return { success: true, value: gameState };
    } catch (error) {
      return { success: false, error: { type: 'invalid_clue' } }; // generic
    }
  }

  static submitClue(
    state: GameState,
    config: GameConfig,
    team: Team,
    role: Role,
    word: string,
    number: number
  ): Result<{ newState: GameState; effects: GameEffect[] }, GameError> {
    if (state.status !== 'in_progress' || state.currentTeam !== team || state.currentRole !== role || role !== 'spymaster') {
      return { success: false, error: { type: 'invalid_turn' } };
    }

    const newState = { ...state, clue: { word, number }, currentRole: 'operative' };
    const attempts = config.limitAttempts ? number + 1 : null;
    newState.attemptsLeft = attempts;

    const effects: GameEffect[] = [
      { type: 'emit', event: 'clue:submitted', payload: { word, number } },
      { type: 'emit', event: 'turn:changed', payload: { team, role: 'operative', timeLimit: config.turnTimeSeconds } },
      { type: 'timer_start', seconds: state.isFirstTurn ? config.firstTurnTimeSeconds : config.turnTimeSeconds },
    ];

    return { success: true, value: { newState, effects } };
  }

  static revealCard(
    state: GameState,
    config: GameConfig,
    cardIndex: number,
    team: Team,
    role: Role
  ): Result<{ newState: GameState; effects: GameEffect[] }, GameError> {
    if (state.status !== 'in_progress' || state.currentTeam !== team || state.currentRole !== role || role !== 'operative') {
      return { success: false, error: { type: 'invalid_turn' } };
    }

    if (state.cards[cardIndex].revealed) {
      return { success: false, error: { type: 'card_already_revealed' } };
    }

    if (config.limitAttempts && state.attemptsLeft !== null && state.attemptsLeft <= 0) {
      return { success: false, error: { type: 'attempts_exceeded' } };
    }

    const card = state.cards[cardIndex];
    const newCards = [...state.cards];
    newCards[cardIndex] = { ...card, revealed: true };

    let newState = { ...state, cards: newCards };
    const effects: GameEffect[] = [];

    if (card.type === team) {
      // Correct
      newState.remainingRed = team === 'red' ? newState.remainingRed - 1 : newState.remainingRed;
      newState.remainingBlue = team === 'blue' ? newState.remainingBlue - 1 : newState.remainingBlue;
      effects.push({ type: 'timer_add', seconds: TIMER_BONUS_ON_CORRECT });
      if (config.limitAttempts && newState.attemptsLeft !== null) {
        newState.attemptsLeft--;
      }
      if (newState.remainingRed === 0 || newState.remainingBlue === 0) {
        newState.status = 'finished';
        newState.winner = newState.remainingRed === 0 ? 'blue' : 'red';
        effects.push({ type: 'emit', event: 'game:over', payload: { winner: newState.winner, reason: 'victory' } });
      }
    } else if (card.type === 'assassin') {
      // Assassin
      newState.status = 'finished';
      newState.winner = team === 'red' ? 'blue' : 'red';
      effects.push({ type: 'emit', event: 'game:over', payload: { winner: newState.winner, reason: 'assassin' } });
    } else {
      // Neutral or opponent
      newState.currentTeam = team === 'red' ? 'blue' : 'red';
      newState.currentRole = 'spymaster';
      newState.clue = null;
      newState.attemptsLeft = null;
      newState.isFirstTurn = false;
      effects.push({ type: 'emit', event: 'turn:changed', payload: { team: newState.currentTeam, role: 'spymaster', timeLimit: config.turnTimeSeconds } });
      effects.push({ type: 'timer_reset' });
    }

    effects.unshift({ type: 'emit', event: 'card:revealed', payload: { cardIndex, team: card.type, remainingRed: newState.remainingRed, remainingBlue: newState.remainingBlue, timerBonus: card.type === team ? TIMER_BONUS_ON_CORRECT : 0 } });

    return { success: true, value: { newState, effects } };
  }

  static passTurn(state: GameState, config: GameConfig, team: Team, role: Role): Result<{ newState: GameState; effects: GameEffect[] }, GameError> {
    if (state.status !== 'in_progress' || state.currentTeam !== team || state.currentRole !== role || role !== 'operative') {
      return { success: false, error: { type: 'invalid_turn' } };
    }

    const newState = { ...state, currentTeam: team === 'red' ? 'blue' : 'red', currentRole: 'spymaster', clue: null, attemptsLeft: null, isFirstTurn: false };
    const effects: GameEffect[] = [
      { type: 'emit', event: 'turn:changed', payload: { team: newState.currentTeam, role: 'spymaster', timeLimit: config.turnTimeSeconds } },
      { type: 'timer_reset' },
    ];

    return { success: true, value: { newState, effects } };
  }

  // For solo mode
  static changeRole(state: GameState, newRole: Role, newTeam: Team): GameState {
    return { ...state, currentRole: newRole, currentTeam: newTeam };
  }
}