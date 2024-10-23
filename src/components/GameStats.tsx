import React from 'react';
import { useGame } from '../context/GameContext';
import { Timer, Trophy, Zap, Hash } from 'lucide-react';

export function GameStats() {
  const { state } = useGame();

  const formatTime = (seconds: number) => {
    if (seconds === 0) return '∞';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const stats = [
    {
      icon: <Trophy className="w-5 h-5 text-yellow-300" />,
      label: 'Score',
      value: state.score.toLocaleString(),
      highlight: state.score > 0,
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-300" />,
      label: 'Combo',
      value: `x${state.combo}`,
      highlight: state.combo > 1,
    },
    {
      icon: <Timer className="w-5 h-5 text-yellow-300" />,
      label: 'Time',
      value: formatTime(state.timeLeft),
      highlight: state.timeLeft < 60,
    },
    {
      icon: <Hash className="w-5 h-5 text-yellow-300" />,
      label: 'Pairs',
      value: `${state.matchedCount}/${state.cards.length / 2}`,
      highlight: state.matchedCount > 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(({ icon, label, value, highlight }) => (
        <div 
          key={label} 
          className={`
            bg-white/10 backdrop-blur-sm rounded-xl p-4 
            flex items-center justify-between transition-all duration-300
            ${highlight ? 'scale-105 bg-white/20' : ''}
          `}
        >
          <div className="flex items-center space-x-2">
            {icon}
            <span className="text-white font-medium">{label}</span>
          </div>
          <span className={`text-2xl font-bold text-white ${highlight ? 'text-yellow-300' : ''}`}>
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}