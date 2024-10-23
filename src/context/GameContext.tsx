import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Card, GameMode, GameState, GameAction } from '../types';
import { generateDeck, calculateScore } from '../utils/deck';

const initialState: GameState = {
  cards: [],
  flippedCards: [],
  matchedPairs: [],
  score: 0,
  combo: 0,
  maxCombo: 0,
  gameMode: 'normal',
  timeLeft: 300,
  isPlaying: false,
  highScore: 0,
  matchedCount: 0,
  totalAttempts: 0,
  gameStatus: 'idle',
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        cards: generateDeck(state.gameMode),
        flippedCards: [],
        matchedPairs: [],
        score: 0,
        combo: 0,
        matchedCount: 0,
        totalAttempts: 0,
        timeLeft: state.gameMode === 'easy' ? 180 : 300,
        isPlaying: true,
        gameStatus: 'playing',
      };

    case 'FLIP_CARD':
      if (state.flippedCards.length === 2) return state;
      return {
        ...state,
        flippedCards: [...state.flippedCards, action.payload],
        totalAttempts: state.flippedCards.length === 1 ? state.totalAttempts + 1 : state.totalAttempts,
      };

    case 'CHECK_MATCH':
      const [first, second] = state.flippedCards;
      const isMatch = first.value === second.value;
      const newCombo = isMatch ? state.combo + 1 : 0;
      const newScore = isMatch ? state.score + calculateScore(state.matchedCount + 1, newCombo) : 0;
      
      return {
        ...state,
        matchedPairs: isMatch ? [...state.matchedPairs, first.value] : state.matchedPairs,
        matchedCount: isMatch ? state.matchedCount + 1 : state.matchedCount,
        score: newScore,
        combo: newCombo,
        maxCombo: Math.max(state.maxCombo, newCombo),
        flippedCards: [],
        highScore: Math.max(state.highScore, newScore),
        gameStatus: state.matchedCount + (isMatch ? 1 : 0) === state.cards.length / 2 ? 'finished' : state.gameStatus,
      };

    case 'TICK':
      const newTimeLeft = Math.max(0, state.timeLeft - 1);
      return {
        ...state,
        timeLeft: newTimeLeft,
        gameStatus: newTimeLeft === 0 ? 'finished' : state.gameStatus,
        isPlaying: newTimeLeft > 0,
      };

    case 'PAUSE_GAME':
      return {
        ...state,
        gameStatus: 'paused',
        isPlaying: false,
      };

    case 'RESUME_GAME':
      return {
        ...state,
        gameStatus: 'playing',
        isPlaying: true,
      };

    case 'SET_MODE':
      return {
        ...state,
        gameMode: action.payload,
        timeLeft: action.payload === 'easy' ? 180 : 300,
      };

    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    if (state.isPlaying && state.gameStatus === 'playing') {
      const timer = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state.isPlaying, state.gameStatus]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}