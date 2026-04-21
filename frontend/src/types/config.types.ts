export interface TimerConfig {
  turnTimeSeconds: number;
  firstTurnTimeSeconds: number;
}

export interface WordBankConfig {
  wordBank: string[];
  customWords: string[];
  replaceMode: boolean;
}

export interface RuleConfig {
  limitAttempts: boolean;
}