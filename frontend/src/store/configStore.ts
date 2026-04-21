import { create } from 'zustand';
import { GameConfig } from '../types/game.types';
import { TimerConfig, WordBankConfig, RuleConfig } from '../types/config.types';
import { DEFAULT_TURN_TIME_SECONDS, DEFAULT_FIRST_TURN_TIME_SECONDS } from '../utils/constants';

interface ConfigStore {
  config: GameConfig;
  setTimerConfig: (timer: TimerConfig) => void;
  setWordBankConfig: (wordBank: WordBankConfig) => void;
  setRuleConfig: (rule: RuleConfig) => void;
  resetConfig: () => void;
}

const defaultConfig: GameConfig = {
  turnTimeSeconds: DEFAULT_TURN_TIME_SECONDS,
  firstTurnTimeSeconds: DEFAULT_FIRST_TURN_TIME_SECONDS,
  wordBank: [],
  limitAttempts: true,
};

export const useConfigStore = create<ConfigStore>((set) => ({
  config: defaultConfig,
  setTimerConfig: (timer) =>
    set((state) => ({
      config: { ...state.config, turnTimeSeconds: timer.turnTimeSeconds, firstTurnTimeSeconds: timer.firstTurnTimeSeconds },
    })),
  setWordBankConfig: (wordBank) =>
    set((state) => ({
      config: { ...state.config, wordBank: wordBank.wordBank },
    })),
  setRuleConfig: (rule) =>
    set((state) => ({
      config: { ...state.config, limitAttempts: rule.limitAttempts },
    })),
  resetConfig: () => set({ config: defaultConfig }),
}));