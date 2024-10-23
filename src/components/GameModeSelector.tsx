import React from 'react';
import { useGame } from '../context/GameContext';
import { GameMode } from '../types';
import { Sparkles, Zap, Flame } from 'lucide-react';

interface ModeSelectorProps {
  onSelect: () => void;
}

export function GameModeSelector({ onSelect }: ModeSelectorProps) {
  const { state, dispatch } = useGame();

  const modes: Array<{ mode: GameMode; icon: React.ReactNode; label: string; description: string }> = [
    {
      mode: 'easy',
      icon: <Sparkles className="w-6 h-6" />,
      label: 'Easy',
      description: '13 pairs • 3 minutes',
    },
    {
      mode: 'normal',
      icon: <Zap className="w-6 h-6" />,
      label: 'Normal',
      description: '26 pairs • 5 minutes',
    },
    {
      mode: 'hard',
      icon: <Flame className="w-6 h-6" />,
      label: 'Hard',
      description: '27 pairs • 5 minutes',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {modes.map(({ mode, icon, label, description }) => (
        <button
          key={mode}
          onClick={() => {
            dispatch({ type: 'SET_MODE', payload: mode });
            onSelect();
          }}
          className={`
            p-6 rounded-xl transition-all duration-200 backdrop-blur-sm
            ${state.gameMode === mode
              ? 'bg-white/20 border-2 border-white/40 shadow-lg'
              : 'bg-white/10 hover:bg-white/15 border-2 border-transparent'
            }
          `}
        >
          <div className="flex flex-col items-center text-white space-y-3">
            {icon}
            <h3 className="text-xl font-bold">{label}</h3>
            <p className="text-sm opacity-80">{description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}