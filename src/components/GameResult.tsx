import React from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, Zap, Target, RotateCcw } from 'lucide-react';

interface GameResultProps {
  onRestart: () => void;
}

export function GameResult({ onRestart }: GameResultProps) {
  const { state } = useGame();

  const stats = [
    {
      icon: <Trophy className="w-6 h-6 text-yellow-400" />,
      label: 'Final Score',
      value: state.score.toLocaleString(),
    },
    {
      icon: <Target className="w-6 h-6 text-green-400" />,
      label: 'Pairs Found',
      value: `${state.matchedCount}/${state.cards.length / 2}`,
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      label: 'Max Combo',
      value: `x${state.maxCombo}`,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Game Over!</h2>
        
        <div className="space-y-4">
          {stats.map(({ icon, label, value }) => (
            <div key={label} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                {icon}
                <span className="font-medium text-gray-700">{label}</span>
              </div>
              <span className="text-xl font-bold text-gray-900">{value}</span>
            </div>
          ))}
        </div>

        {state.score > 0 && state.score === state.highScore && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-yellow-800 font-semibold">🎉 New High Score! 🎉</p>
          </div>
        )}

        <button
          onClick={onRestart}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg
            flex items-center justify-center space-x-2 transition-colors duration-200"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Play Again</span>
        </button>
      </div>
    </div>
  );
}