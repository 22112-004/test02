import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  isFlipped: boolean;
  onClick: () => void;
}

export function Card({ card, isFlipped, onClick }: CardProps) {
  const isRed = card.suit === '♥️' || card.suit === '♦️';
  const cardColor = isRed ? 'text-red-500' : 'text-gray-800';
  
  const renderCardContent = () => {
    if (card.rank === 'joker') {
      return (
        <div className="text-6xl flex items-center justify-center h-full">
          {card.symbol}
        </div>
      );
    }

    return (
      <>
        <div className="absolute top-2 left-2 flex flex-col items-center">
          <span className="text-lg font-bold">{card.rank}</span>
          <span className="text-xl">{card.suit}</span>
        </div>
        <div className="text-5xl flex items-center justify-center h-full">
          {card.rank}
        </div>
        <div className="absolute bottom-2 right-2 flex flex-col items-center rotate-180">
          <span className="text-lg font-bold">{card.rank}</span>
          <span className="text-xl">{card.suit}</span>
        </div>
      </>
    );
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative aspect-[3/4] cursor-pointer transition-all duration-500
        transform-gpu perspective-1000 ${isFlipped ? 'rotate-y-180' : ''}
        hover:scale-105
      `}
    >
      <div className="absolute inset-0 backface-hidden">
        <div className="w-full h-full bg-white rounded-xl shadow-lg border-2 border-white/20 
          flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="text-4xl">🎴</div>
        </div>
      </div>
      <div className="absolute inset-0 backface-hidden rotate-y-180">
        <div className={`relative w-full h-full bg-white rounded-xl shadow-lg border-2 
          border-white/20 p-2 ${cardColor} bg-gradient-to-br from-gray-50 to-gray-100`}>
          {renderCardContent()}
        </div>
      </div>
    </div>
  );
}