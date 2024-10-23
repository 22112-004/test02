import React from 'react';
import { useGame } from '../context/GameContext';
import { Card } from './Card';

export function GameBoard() {
  const { state, dispatch } = useGame();

  const handleCardClick = (card: Card) => {
    if (
      state.flippedCards.length === 2 ||
      state.flippedCards.find(c => c.id === card.id) ||
      state.matchedPairs.includes(card.value)
    ) {
      return;
    }
    dispatch({ type: 'FLIP_CARD', payload: card });
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {state.cards.map(card => (
        <Card
          key={card.id}
          card={card}
          isFlipped={
            state.flippedCards.find(c => c.id === card.id) !== undefined ||
            state.matchedPairs.includes(card.value)
          }
          onClick={() => handleCardClick(card)}
        />
      ))}
    </div>
  );
}