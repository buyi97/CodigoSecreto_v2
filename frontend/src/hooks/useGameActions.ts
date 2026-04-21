import { useGameStore } from '../store/gameStore';
import { useRoomStore } from '../store/roomStore';
import { socketClient } from '../utils/socketClient';

export function useGameActions() {
  const socket = socketClient.getSocket();
  const { room, playerId } = useRoomStore();

  const submitClue = (word: string, number: number) => {
    if (socket && room && playerId) {
      socket.emit('submit_clue', { word, number });
    }
  };

  const revealCard = (cardIndex: number) => {
    if (socket && room && playerId) {
      socket.emit('reveal_card', { cardIndex });
    }
  };

  const passTurn = () => {
    if (socket && room && playerId) {
      socket.emit('pass_turn');
    }
  };

  const endGame = () => {
    if (socket && room && playerId) {
      socket.emit('end_game');
    }
  };

  const returnToLobby = () => {
    if (socket && room && playerId) {
      socket.emit('return_to_lobby');
    }
  };

  return { submitClue, revealCard, passTurn, endGame, returnToLobby };
}