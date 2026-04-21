import { Card, CardType } from '../models/GameState';

export function generateBoard(wordBank: string[]): Card[] {
  if (wordBank.length < 25) {
    throw new Error('Word bank must have at least 25 words');
  }

  // Shuffle words
  const shuffledWords = wordBank.sort(() => Math.random() - 0.5).slice(0, 25);

  // Randomly choose starting team
  const startingTeam: CardType = Math.random() < 0.5 ? 'red' : 'blue';

  // Assign types: starting team gets 9, other 8, neutral 7, assassin 1
  const types: CardType[] = [];
  const startingCount = 9;
  const otherCount = 8;
  const neutralCount = 7;
  const assassinCount = 1;

  for (let i = 0; i < startingCount; i++) types.push(startingTeam);
  for (let i = 0; i < otherCount; i++) types.push(startingTeam === 'red' ? 'blue' : 'red');
  for (let i = 0; i < neutralCount; i++) types.push('neutral');
  types.push('assassin');

  // Shuffle types
  const shuffledTypes = types.sort(() => Math.random() - 0.5);

  return shuffledWords.map((word, index) => ({
    word,
    type: shuffledTypes[index],
    revealed: false,
  }));
}