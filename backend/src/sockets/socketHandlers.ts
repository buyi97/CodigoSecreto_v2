import { Socket } from 'socket.io';
import { RoomManager } from '../services/RoomManager';
import { GameService } from '../services/GameService';

interface ServerToClientEvents {
  'game:full_state': (payload: any) => void;
  'card:revealed': (payload: any) => void;
  'turn:changed': (payload: any) => void;
  'clue:submitted': (payload: any) => void;
  'game:over': (payload: any) => void;
  'room:return_to_lobby': () => void;
  'words:bank_depleted': () => void;
  'config:locked': () => void;
  'config:unlocked': () => void;
  'error': (message: string) => void;
}

interface ClientToServerEvents {
  'create_room': (data: { name: string; isPrivate: boolean; password?: string }) => void;
  'join_room': (data: { roomId: string; name: string; password?: string }) => void;
  'rejoin_room': (data: { roomId: string; playerId: string }) => void;
  'assign_team': (data: { playerId: string; team: string }) => void;
  'assign_role': (data: { playerId: string; role: string }) => void;
  'update_config': (data: Partial<any>) => void;
  'start_game': () => void;
  'submit_clue': (data: { word: string; number: number }) => void;
  'reveal_card': (data: { cardIndex: number }) => void;
  'pass_turn': () => void;
  'end_game': () => void;
  'return_to_lobby': () => void;
  'add_custom_words': (data: { words: string[] }) => void;
  'replace_word_bank': (data: { words: string[] }) => void;
}

export function handleSocket(
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  roomManager: RoomManager
) {
  let currentRoomId: string | null = null;
  let currentPlayerId: string | null = null;

  socket.on('create_room', async (data) => {
    try {
      const roomId = await roomManager.createRoom(data.name, data.isPrivate, data.password);
      currentRoomId = roomId;
      currentPlayerId = Array.from(roomManager.getRoom(roomId)!.players.keys())[0];
      socket.join(roomId);
      socket.emit('game:full_state', getFullState(roomId, roomManager));
    } catch (error) {
      socket.emit('error', (error as Error).message);
    }
  });

  socket.on('join_room', async (data) => {
    try {
      const playerId = await roomManager.addPlayerToRoom(data.roomId, data.name, false, data.password);
      currentRoomId = data.roomId;
      currentPlayerId = playerId;
      socket.join(data.roomId);
      socket.to(data.roomId).emit('game:full_state', getFullState(data.roomId, roomManager));
      socket.emit('game:full_state', getFullState(data.roomId, roomManager));
    } catch (error) {
      socket.emit('error', (error as Error).message);
    }
  });

  socket.on('rejoin_room', (data) => {
    const room = roomManager.getRoom(data.roomId);
    if (room && room.players.has(data.playerId)) {
      currentRoomId = data.roomId;
      currentPlayerId = data.playerId;
      socket.join(data.roomId);
      socket.emit('game:full_state', getFullState(data.roomId, roomManager));
    } else {
      socket.emit('error', 'Room or player not found');
    }
  });

  socket.on('assign_team', (data) => {
    if (!currentRoomId || !currentPlayerId) return;
    const room = roomManager.getRoom(currentRoomId);
    if (!room || !room.players.get(currentPlayerId)?.isAdmin) return;
    roomManager.assignTeam(currentRoomId, data.playerId, data.team as any);
    socket.to(currentRoomId).emit('game:full_state', getFullState(currentRoomId, roomManager));
    socket.emit('game:full_state', getFullState(currentRoomId, roomManager));
  });

  socket.on('assign_role', (data) => {
    if (!currentRoomId || !currentPlayerId) return;
    const room = roomManager.getRoom(currentRoomId);
    if (!room || !room.players.get(currentPlayerId)?.isAdmin) return;
    roomManager.assignRole(currentRoomId, data.playerId, data.role as any);
    socket.to(currentRoomId).emit('game:full_state', getFullState(currentRoomId, roomManager));
    socket.emit('game:full_state', getFullState(currentRoomId, roomManager));
  });

  socket.on('update_config', (data) => {
    if (!currentRoomId || !currentPlayerId) return;
    const room = roomManager.getRoom(currentRoomId);
    if (!room || !room.players.get(currentPlayerId)?.isAdmin) return;
    roomManager.updateConfig(currentRoomId, data);
    socket.to(currentRoomId).emit('game:full_state', getFullState(currentRoomId, roomManager));
    socket.emit('game:full_state', getFullState(currentRoomId, roomManager));
  });

  socket.on('start_game', () => {
    if (!currentRoomId || !currentPlayerId) return;
    const room = roomManager.getRoom(currentRoomId);
    if (!room || !room.players.get(currentPlayerId)?.isAdmin) return;

    const result = roomManager.startGame(currentRoomId);
    if (result.success) {
      room.gameState = result.value;
      socket.to(currentRoomId).emit('game:full_state', getFullState(currentRoomId, roomManager));
      socket.emit('game:full_state', getFullState(currentRoomId, roomManager));
      socket.to(currentRoomId).emit('config:locked');
      socket.emit('config:locked');
    } else {
      socket.emit('error', 'Cannot start game');
    }
  });

  socket.on('submit_clue', (data) => {
    if (!currentRoomId || !currentPlayerId) return;
    const room = roomManager.getRoom(currentRoomId);
    if (!room || !room.gameState) return;
    const player = room.players.get(currentPlayerId);
    if (!player) return;

    const result = GameService.submitClue(room.gameState, room.config, player.team!, player.role!, data.word, data.number);
    if (result.success) {
      room.gameState = result.value.newState;
      result.value.effects.forEach(effect => {
        if (effect.type === 'emit') {
          socket.to(currentRoomId!).emit(effect.event, effect.payload);
          socket.emit(effect.event, effect.payload);
        } else if (effect.type === 'timer_start') {
          room.timerManager.start(effect.seconds);
        }
      });
    } else {
      socket.emit('error', 'Invalid clue');
    }
  });

  socket.on('reveal_card', (data) => {
    if (!currentRoomId || !currentPlayerId) return;
    const room = roomManager.getRoom(currentRoomId);
    if (!room || !room.gameState) return;
    const player = room.players.get(currentPlayerId);
    if (!player) return;

    const result = GameService.revealCard(room.gameState, room.config, data.cardIndex, player.team!, player.role!);
    if (result.success) {
      room.gameState = result.value.newState;
      result.value.effects.forEach(effect => {
        if (effect.type === 'emit') {
          socket.to(currentRoomId!).emit(effect.event, effect.payload);
          socket.emit(effect.event, effect.payload);
        } else if (effect.type === 'timer_add') {
          room.timerManager.addSeconds(effect.seconds);
        } else if (effect.type === 'timer_reset') {
          room.timerManager.reset();
        }
      });
    } else {
      socket.emit('error', 'Invalid action');
    }
  });

  socket.on('pass_turn', () => {
    if (!currentRoomId || !currentPlayerId) return;
    const room = roomManager.getRoom(currentRoomId);
    if (!room || !room.gameState) return;
    const player = room.players.get(currentPlayerId);
    if (!player) return;

    const result = GameService.passTurn(room.gameState, room.config, player.team!, player.role!);
    if (result.success) {
      room.gameState = result.value.newState;
      result.value.effects.forEach(effect => {
        if (effect.type === 'emit') {
          socket.to(currentRoomId!).emit(effect.event, effect.payload);
          socket.emit(effect.event, effect.payload);
        } else if (effect.type === 'timer_reset') {
          room.timerManager.reset();
        }
      });
    } else {
      socket.emit('error', 'Invalid action');
    }
  });

  socket.on('end_game', () => {
    if (!currentRoomId || !currentPlayerId) return;
    const room = roomManager.getRoom(currentRoomId);
    if (!room || !room.players.get(currentPlayerId)?.isAdmin) return;

    if (room.gameState) {
      room.gameState.status = 'finished';
      room.gameState.winner = null; // Manual end
      socket.to(currentRoomId).emit('game:over', { winner: null, reason: 'manual' });
      socket.emit('game:over', { winner: null, reason: 'manual' });
    }
  });

  socket.on('return_to_lobby', () => {
    if (!currentRoomId) return;
    const room = roomManager.getRoom(currentRoomId);
    if (!room) return;

    room.gameState = null;
    socket.to(currentRoomId).emit('room:return_to_lobby');
    socket.emit('room:return_to_lobby');
    socket.to(currentRoomId).emit('config:unlocked');
    socket.emit('config:unlocked');
  });

  socket.on('add_custom_words', (data) => {
    if (!currentRoomId) return;
    roomManager.addCustomWords(currentRoomId, data.words);
  });

  socket.on('replace_word_bank', (data) => {
    if (!currentRoomId) return;
    roomManager.replaceWordBank(currentRoomId, data.words);
  });

  socket.on('disconnect', () => {
    if (currentRoomId && currentPlayerId) {
      roomManager.removePlayerFromRoom(currentRoomId, currentPlayerId);
      socket.to(currentRoomId).emit('game:full_state', getFullState(currentRoomId, roomManager));
    }
  });
}

function getFullState(roomId: string, roomManager: RoomManager): any {
  const room = roomManager.getRoom(roomId);
  if (!room) return null;

  return {
    roomId,
    players: Array.from(room.players.values()),
    gameState: room.gameState,
    config: room.config,
    history: room.history,
    isPrivate: !!room.passwordHash,
  };
}