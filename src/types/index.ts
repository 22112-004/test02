export interface Card {
  id: number;
  value: string;
  symbol: string;
  suit?: string;
  rank?: string;
}

export type GameMode = 'easy' | 'normal' | 'hard';
export type TimeLimit = 180 | 300 | 0; // 3min, 5min, unlimited

export interface GameState {
  cards: Card[];
  flippedCards: Card[];
  matchedPairs: string[];
  score: number;
  combo: number;
  maxCombo: number;
  gameMode: GameMode;
  timeLeft: number;
  isPlaying: boolean;
  highScore: number;
  matchedCount: number;
  totalAttempts: number;
  gameStatus: 'idle' | 'playing' | 'paused' | 'finished';
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'FLIP_CARD'; payload: Card }
  | { type: 'CHECK_MATCH' }
  | { type: 'TICK' }
  | { type: 'SET_MODE'; payload: GameMode }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'END_GAME' };