import type { QuizState } from '../types/content';

const STORAGE_KEY = 'trading-quiz-state';

export const loadState = (): QuizState | null => {
  try {
    const item = window.localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return null;
  }
};

export const saveState = (state: QuizState): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

export const clearState = (): void => {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing state from localStorage:', error);
  }
};

