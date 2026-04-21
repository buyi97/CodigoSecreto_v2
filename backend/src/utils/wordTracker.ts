import { DEFAULT_WORD_BANK } from './wordBank';
import { MIN_WORD_BANK_SIZE } from './constants';

export class WordTracker {
  private usedWords: Set<string> = new Set();
  private customWords: string[] = [];

  constructor(initialUsedWords: string[] = []) {
    this.usedWords = new Set(initialUsedWords);
  }

  addUsedWords(words: string[]): void {
    words.forEach(word => this.usedWords.add(word));
  }

  getAvailableWords(wordBank: string[], count: number): string[] {
    const available = wordBank.filter(word => !this.usedWords.has(word));
    if (available.length < count) {
      throw new Error('Not enough available words');
    }
    // Shuffle and take count
    const shuffled = available.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  hasEnoughWords(wordBank: string[], count: number): boolean {
    const available = wordBank.filter(word => !this.usedWords.has(word));
    return available.length >= count;
  }

  getUsedWords(): string[] {
    return Array.from(this.usedWords);
  }

  addCustomWords(words: string[]): void {
    this.customWords.push(...words);
  }

  getFullWordBank(): string[] {
    return [...DEFAULT_WORD_BANK, ...this.customWords];
  }
}