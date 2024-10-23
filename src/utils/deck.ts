import { Card, GameMode } from '../types';

const SUITS = ['♠️', '♥️', '♣️', '♦️'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generateDeck(mode: GameMode): Card[] {
  let cards: Card[] = [];
  const pairsNeeded = mode === 'easy' ? 13 : mode === 'normal' ? 26 : 52;

  // Create all possible combinations
  const combinations = SUITS.flatMap(suit =>
    RANKS.map(rank => ({ suit, rank }))
  );

  // Shuffle combinations and take required number of pairs
  const selectedCombinations = shuffleArray(combinations).slice(0, pairsNeeded);

  // Create pairs of cards
  selectedCombinations.forEach((combo, index) => {
    const value = `${combo.suit}${combo.rank}`;
    cards.push(
      { id: index * 2, value, symbol: combo.suit, suit: combo.suit, rank: combo.rank },
      { id: index * 2 + 1, value, symbol: combo.suit, suit: combo.suit, rank: combo.rank }
    );
  });

  // Add Jokers for hard mode
  if (mode === 'hard') {
    cards.push(
      { id: cards.length, value: 'JOKER', symbol: '🃏', suit: 'special', rank: 'joker' },
      { id: cards.length + 1, value: 'JOKER', symbol: '🃏', suit: 'special', rank: 'joker' }
    );
  }

  // Shuffle the final deck
  return shuffleArray(cards);
}

export function calculateScore(matchCount: number, combo: number): number {
  const baseScore = 100;
  const comboMultiplier = Math.min(combo, 10); // Cap combo at 10x
  const comboBonus = comboMultiplier * 100;
  return baseScore + comboBonus;
}