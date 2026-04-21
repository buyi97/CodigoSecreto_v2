import { Room } from '../models/Room';
import { Player, Team, Role } from '../models/Player';
import { GameConfig } from '../models/GameConfig';
import { GameState } from '../models/GameState';
import { WordTracker } from '../utils/wordTracker';
import { TimerManager } from '../utils/timerManager';
import { hashPassword, verifyPassword } from '../utils/hashUtils';
import { DEFAULT_WORD_BANK } from '../utils/wordBank';
import { GameService, Result } from './GameService';
import { ROOM_ID_MIN, ROOM_ID_MAX, MAX_ROOMS, ROOM_CLEANUP_DELAY_MS, DEFAULT_TURN_TIME_SECONDS, DEFAULT_FIRST_TURN_TIME_SECONDS, MIN_WORD_BANK_SIZE } from '../utils/constants';

export class RoomManager {
  private rooms: Map<string, Room> = new Map();
  private cleanupTimeouts: Map<string, NodeJS.Timeout> = new Map();

  async createRoom(adminName: string, isPrivate: boolean, password?: string): Promise<string> {
    if (this.rooms.size >= MAX_ROOMS) {
      throw new Error('Max rooms reached');
    }

    let roomId: string;
    do {
      roomId = Math.floor(Math.random() * (ROOM_ID_MAX - ROOM_ID_MIN + 1) + ROOM_ID_MIN).toString();
    } while (this.rooms.has(roomId));

    const passwordHash = isPrivate && password ? await hashPassword(password) : null;

    const config: GameConfig = {
      turnTimeSeconds: DEFAULT_TURN_TIME_SECONDS,
      firstTurnTimeSeconds: DEFAULT_FIRST_TURN_TIME_SECONDS,
      wordBank: DEFAULT_WORD_BANK,
      limitAttempts: true,
    };

    const room: Room = {
      id: roomId,
      passwordHash,
      players: new Map(),
      gameState: null,
      config,
      wordTracker: new WordTracker(),
      timerManager: new TimerManager(),
      history: { redWins: 0, blueWins: 0 },
      createdAt: new Date(),
      lastActivity: new Date(),
    };

    this.rooms.set(roomId, room);
    await this.addPlayerToRoom(roomId, adminName, true);

    return roomId;
  }

  async addPlayerToRoom(roomId: string, playerName: string, isAdmin: boolean = false, password?: string): Promise<string> {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error('Room not found');

    if (room.passwordHash && (!password || !(await verifyPassword(password, room.passwordHash)))) {
      throw new Error('Invalid password');
    }

    const playerId = Math.random().toString(36).substr(2, 9);
    const player: Player = {
      id: playerId,
      name: playerName,
      team: null,
      role: null,
      isAdmin,
      isConnected: true,
    };

    room.players.set(playerId, player);
    room.lastActivity = new Date();

    // Cancel cleanup if any
    const timeout = this.cleanupTimeouts.get(roomId);
    if (timeout) {
      clearTimeout(timeout);
      this.cleanupTimeouts.delete(roomId);
    }

    return playerId;
  }

  removePlayerFromRoom(roomId: string, playerId: string): void {
    const room = this.rooms.get(roomId);
    if (!room) return;

    room.players.delete(playerId);
    room.lastActivity = new Date();

    // If no players, schedule cleanup
    if (room.players.size === 0) {
      const timeout = setTimeout(() => {
        this.rooms.delete(roomId);
        this.cleanupTimeouts.delete(roomId);
      }, ROOM_CLEANUP_DELAY_MS);
      this.cleanupTimeouts.set(roomId, timeout);
    } else {
      // Transfer admin if admin left
      const admin = Array.from(room.players.values()).find(p => p.isAdmin);
      if (!admin) {
        const nextPlayer = Array.from(room.players.values())[0];
        nextPlayer.isAdmin = true;
      }
    }
  }

  assignTeam(roomId: string, playerId: string, team: Team): void {
    const room = this.rooms.get(roomId);
    if (!room) return;

    const player = room.players.get(playerId);
    if (player) {
      player.team = team;
      player.role = null; // Reset role when changing team
    }
  }

  assignRole(roomId: string, playerId: string, role: Role): void {
    const room = this.rooms.get(roomId);
    if (!room) return;

    const player = room.players.get(playerId);
    if (player && player.team) {
      player.role = role;
    }
  }

  updateConfig(roomId: string, config: Partial<GameConfig>): void {
    const room = this.rooms.get(roomId);
    if (!room || room.gameState?.status === 'in_progress') return;

    room.config = { ...room.config, ...config };
  }

  startGame(roomId: string): Result<GameState, any> {
    const room = this.rooms.get(roomId);
    if (!room) return { success: false, error: { type: 'room_not_found' } };

    const players = Array.from(room.players.values());
    const redPlayers = players.filter(p => p.team === 'red');
    const bluePlayers = players.filter(p => p.team === 'blue');

    if (redPlayers.length === 0 || bluePlayers.length === 0) {
      return { success: false, error: { type: 'insufficient_players' } };
    }

    const redSpymaster = redPlayers.find(p => p.role === 'spymaster');
    const blueSpymaster = bluePlayers.find(p => p.role === 'spymaster');

    if (!redSpymaster || !blueSpymaster) {
      return { success: false, error: { type: 'missing_spymasters' } };
    }

    if (!room.wordTracker.hasEnoughWords(room.config.wordBank, 25)) {
      return { success: false, error: { type: 'insufficient_words' } };
    }

    const availableWords = room.wordTracker.getAvailableWords(room.config.wordBank, 25);
    room.wordTracker.addUsedWords(availableWords);

    return GameService.createGame(room.config, availableWords);
  }

  getRoom(roomId: string): Room | undefined {
    return this.rooms.get(roomId);
  }

  getPublicRooms(): { id: string; playerCount: number }[] {
    return Array.from(this.rooms.values())
      .filter(room => !room.passwordHash)
      .map(room => ({ id: room.id, playerCount: room.players.size }));
  }

  updateHistory(roomId: string, winner: Team): void {
    const room = this.rooms.get(roomId);
    if (room) {
      if (winner === 'red') room.history.redWins++;
      else room.history.blueWins++;
    }
  }

  addCustomWords(roomId: string, words: string[]): void {
    const room = this.rooms.get(roomId);
    if (room) {
      room.wordTracker.addCustomWords(words);
    }
  }

  replaceWordBank(roomId: string, words: string[]): void {
    const room = this.rooms.get(roomId);
    if (room && words.length >= MIN_WORD_BANK_SIZE) {
      room.config.wordBank = words;
      room.wordTracker = new WordTracker(); // Reset tracker
    }
  }
}