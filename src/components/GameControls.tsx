import React from 'react';
import { useGame } from '../context/GameContext';
import { Play, RefreshCw, Pause, Settings } from 'lucide-react';
import { GameModeSelector } from './GameModeSelector';

export function GameControls() {
  const { state, dispatch } = useGame();
  const [showModeSelector, setShowModeSelector] = React.useState(!state.isPlaying);

  const handleStart = () => {
    setShowModeSelector(false);
    dispatch({ type: 'START_GAME' });
  };

  if (showModeSelector) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Select Game Mode</h2>
        <GameModeSelector onSelect={handleStart} />
      </div>
    );
  }

  return (
    <div className="flex justify-center space-x-4">
      {state.isPlaying ? (
        <>
          <button
            onClick={() => dispatch({ type: 'PAUSE_GAME' })}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg
              flex items-center space-x-2 transition-colors duration-200"
          >
            <Pause className="w-5 h-5" />
            <span>Pause</span>
          </button>
          <button
            onClick={() => setShowModeSelector(true)}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg
              flex items-center space-x-2 transition-colors duration-200"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Restart</span>
          </button>
        </>
      ) : (
        <button
          onClick={() => setShowModeSelector(true)}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg
            flex items-center space-x-2 transition-colors duration-200"
        >
          <Play className="w-5 h-5" />
          <span>Start Game</span>
        </button>
      )}
      <button
        onClick={() => dispatch({ type: 'SET_MODE', payload: state.gameMode })}
        className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg
          flex items-center space-x-2 transition-colors duration-200"
      >
        <Settings className="w-5 h-5" />
        <span>Settings</span>
      </button>
    </div>
  );
}