import { useState, useEffect } from 'react';
import { getActiveUserId, getProgressKey } from './useUsers';

export interface DayProgress {
  date: string;
  wordId: number;
  vocabQuizDone: boolean;
  conjugationDone: boolean;
  challengeDone: boolean;
  dialogueDone: boolean;
  vocabScore?: number;
  conjugationScore?: number;
  challengeScore?: number;
}

export interface Progress {
  currentStreak: number;
  longestStreak: number;
  wordsLearned: number[];
  completedDays: DayProgress[];
  lastActiveDate: string;
}

function getStorageKey(): string {
  const uid = getActiveUserId();
  return uid ? getProgressKey(uid) : 'french-daily-progress';
}

const defaultProgress: Progress = {
  currentStreak: 0,
  longestStreak: 0,
  wordsLearned: [],
  completedDays: [],
  lastActiveDate: '',
};

function getToday(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function useProgress() {
  const storageKey = getStorageKey();

  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultProgress;
      }
    }
    return defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, storageKey]);

  const today = getToday();

  const getTodayProgress = (): DayProgress | undefined => {
    return progress.completedDays.find(d => d.date === today);
  };

  const getDayNumber = (): number => {
    // Use absolute date calculation based on a fixed epoch (2025-01-01)
    // This ensures each calendar day always gets a unique, stable number
    // regardless of when the user first opened the app
    const epoch = new Date(2025, 0, 1); // Jan 1 2025, local time
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.floor((now.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getWordOfTheDay = (totalWords: number): number => {
    const dayNum = getDayNumber();
    return dayNum % totalWords;
  };

  const markWordLearned = (wordId: number) => {
    setProgress(prev => {
      if (prev.wordsLearned.includes(wordId)) return prev;
      return { ...prev, wordsLearned: [...prev.wordsLearned, wordId] };
    });
  };

  const updateTodayProgress = (update: Partial<DayProgress>) => {
    setProgress(prev => {
      const existing = prev.completedDays.find(d => d.date === today);
      let newDays: DayProgress[];

      if (existing) {
        newDays = prev.completedDays.map(d =>
          d.date === today ? { ...d, ...update } : d
        );
      } else {
        newDays = [
          ...prev.completedDays,
          {
            date: today,
            wordId: 0,
            vocabQuizDone: false,
            conjugationDone: false,
            challengeDone: false,
            dialogueDone: false,
            ...update,
          },
        ];
      }

      // Update streak (use local date to avoid UTC timezone mismatch)
      let streak = prev.currentStreak;
      const yd = new Date();
      yd.setDate(yd.getDate() - 1);
      const yesterdayStr = `${yd.getFullYear()}-${String(yd.getMonth() + 1).padStart(2, '0')}-${String(yd.getDate()).padStart(2, '0')}`;

      if (prev.lastActiveDate === yesterdayStr || prev.lastActiveDate === today) {
        if (prev.lastActiveDate !== today) {
          streak += 1;
        }
      } else if (prev.lastActiveDate !== today) {
        streak = 1;
      }

      return {
        ...prev,
        completedDays: newDays,
        lastActiveDate: today,
        currentStreak: streak,
        longestStreak: Math.max(prev.longestStreak, streak),
      };
    });
  };

  return {
    progress,
    today,
    getTodayProgress,
    getDayNumber,
    getWordOfTheDay,
    markWordLearned,
    updateTodayProgress,
  };
}
