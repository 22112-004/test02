import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GameBoard } from './GameBoard';
import { GameControls } from './GameControls';
import { GameStats } from './GameStats';
import { GameResult } from './GameResult';

export function Game() {
  const { state, dispatch } = useGame();

  useEffect(() => {
    if (state.flippedCards.length === 2) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CHECK_MATCH' });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.flippedCards]);

  const handleRestart = () => {
    dispatch({ type: 'START_GAME' });
  };

  return (
    <div className="space-y-8">
      <GameStats />
      <GameBoard />
      <GameControls />
      {state.gameStatus === 'finished' && (
        <GameResult onRestart={handleRestart} />
      )}
    </div>
  );
}