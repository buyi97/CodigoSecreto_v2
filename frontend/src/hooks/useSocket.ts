import { useEffect, useRef } from 'react';
import { socketClient } from '../utils/socketClient';
import { useGameStore } from '../store/gameStore';
import { useRoomStore } from '../store/roomStore';
import { useUIStore } from '../store/uiStore';

export function useSocket() {
  const socketRef = useRef<any>(null);
  const { setGameState, revealCard, updateTurn, setClue, endGame } = useGameStore();
  const { setRoom, updatePlayers, updateConfig, updateHistory, setPlayerId } = useRoomStore();
  const { setError } = useUIStore();

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!backendUrl) {
      setError('Backend URL not configured');
      return;
    }

    const socket = socketClient.connect(backendUrl);
    socketRef.current = socket;

    socket.on('game:full_state', (payload) => {
      // Forzamos a que tenga la propiedad 'id' que esperan tus componentes visuales
      const normalizedRoom = { ...payload, id: payload.roomId || payload.id };
      setRoom(normalizedRoom);
      setGameState(payload.gameState);
    });

    socket.on('card:revealed', (payload) => {
      revealCard(payload.cardIndex, payload.team, payload.remainingRed, payload.remainingBlue);
    });

    socket.on('turn:changed', (payload) => {
      updateTurn(payload.team, payload.role);
    });

    socket.on('clue:submitted', (payload) => {
      setClue(payload.word, payload.number);
    });

    socket.on('game:over', (payload) => {
      endGame(payload.winner, payload.reason);
    });
    
    socket.on('you_joined', (id) => {
      setPlayerId(id);
    });

    socket.on('error', (message) => {
      setError(message);
    });

    return () => {
      socket.off('game:full_state');
      socket.off('card:revealed');
      socket.off('turn:changed');
      socket.off('clue:submitted');
      socket.off('game:over');
      socket.off('error');
    };
  }, [setGameState, revealCard, updateTurn, setClue, endGame, setRoom, updatePlayers, updateConfig, updateHistory, setError]);

  return socketRef.current;
}