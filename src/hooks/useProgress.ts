import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
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

const defaultProgress: Progress = {
  currentStreak: 0,
  longestStreak: 0,
  wordsLearned: [],
  completedDays: [],
  lastActiveDate: '',
};

function getToday(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function computeStreaks(days: DayProgress[]): { currentStreak: number; longestStreak: number; lastActiveDate: string } {
  if (days.length === 0) return { currentStreak: 0, longestStreak: 0, lastActiveDate: '' };

  const sortedDates = [...new Set(days.map(d => d.date))].sort();
  const lastDate = sortedDates[sortedDates.length - 1];

  let streak = 1;
  let longestStreak = 1;
  for (let i = 1; i < sortedDates.length; i++) {
    const diff = (new Date(sortedDates[i]).getTime() - new Date(sortedDates[i - 1]).getTime()) / 86400000;
    if (diff === 1) { streak++; longestStreak = Math.max(longestStreak, streak); }
    else streak = 1;
  }

  const today = getToday();
  const yd = new Date(); yd.setDate(yd.getDate() - 1);
  const yesterday = `${yd.getFullYear()}-${String(yd.getMonth() + 1).padStart(2, '0')}-${String(yd.getDate()).padStart(2, '0')}`;

  const currentStreak = (lastDate === today || lastDate === yesterday) ? streak : 0;
  return { currentStreak, longestStreak, lastActiveDate: lastDate };
}

// ── Supabase sync helpers ───────────────────────────────────────────────────

export async function loadProgressFromSupabase(userId: string): Promise<void> {
  const [{ data: days }, { data: profile }] = await Promise.all([
    supabase.from('progress').select('*').eq('user_id', userId),
    supabase.from('profiles').select('words_learned').eq('id', userId).single(),
  ]);

  const completedDays: DayProgress[] = (days ?? []).map(row => ({
    date: row.date,
    wordId: 0,
    vocabQuizDone: row.vocab_quiz_done ?? false,
    conjugationDone: row.conjugation_done ?? false,
    challengeDone: row.challenge_done ?? false,
    dialogueDone: row.dialogue_done ?? false,
    vocabScore: row.vocab_score ?? undefined,
    conjugationScore: row.conjugation_score ?? undefined,
    challengeScore: row.challenge_score ?? undefined,
  }));

  const wordsLearned: number[] = profile?.words_learned ?? [];
  const { currentStreak, longestStreak, lastActiveDate } = computeStreaks(completedDays);

  const progress: Progress = { completedDays, wordsLearned, currentStreak, longestStreak, lastActiveDate };
  localStorage.setItem(getProgressKey(userId), JSON.stringify(progress));
}

async function syncDay(userId: string, day: DayProgress): Promise<void> {
  await supabase.from('progress').upsert({
    user_id: userId,
    date: day.date,
    vocab_quiz_done: day.vocabQuizDone,
    conjugation_done: day.conjugationDone,
    challenge_done: day.challengeDone,
    dialogue_done: day.dialogueDone,
    vocab_score: day.vocabScore ?? null,
    conjugation_score: day.conjugationScore ?? null,
    challenge_score: day.challengeScore ?? null,
  }, { onConflict: 'user_id,date' });
}

async function syncWords(userId: string, wordIds: number[]): Promise<void> {
  await supabase.from('profiles').update({ words_learned: wordIds }).eq('id', userId);
}

// ── Hook ────────────────────────────────────────────────────────────────────

function getStorageKey(): string {
  const uid = getActiveUserId();
  return uid ? getProgressKey(uid) : 'mb-progress-guest';
}

export function useProgress() {
  const storageKey = getStorageKey();

  const [progress, setProgress] = useState<Progress>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, storageKey]);

  const today = getToday();

  const getTodayProgress = (): DayProgress | undefined =>
    progress.completedDays.find(d => d.date === today);

  const getDayNumber = (): number => {
    const epoch = new Date(2025, 0, 1);
    const now = new Date(); now.setHours(0, 0, 0, 0);
    return Math.floor((now.getTime() - epoch.getTime()) / 86400000);
  };

  const getWordOfTheDay = (totalWords: number): number => getDayNumber() % totalWords;

  const markWordLearned = (wordId: number) => {
    setProgress(prev => {
      if (prev.wordsLearned.includes(wordId)) return prev;
      const updated = { ...prev, wordsLearned: [...prev.wordsLearned, wordId] };
      const uid = getActiveUserId();
      if (uid) syncWords(uid, updated.wordsLearned).catch(console.error);
      return updated;
    });
  };

  const updateTodayProgress = (update: Partial<DayProgress>) => {
    setProgress(prev => {
      const existing = prev.completedDays.find(d => d.date === today);
      const newDays: DayProgress[] = existing
        ? prev.completedDays.map(d => d.date === today ? { ...d, ...update } : d)
        : [...prev.completedDays, { date: today, wordId: 0, vocabQuizDone: false, conjugationDone: false, challengeDone: false, dialogueDone: false, ...update }];

      const yd = new Date(); yd.setDate(yd.getDate() - 1);
      const yesterday = `${yd.getFullYear()}-${String(yd.getMonth() + 1).padStart(2, '0')}-${String(yd.getDate()).padStart(2, '0')}`;
      let streak = prev.currentStreak;
      if (prev.lastActiveDate === yesterday || prev.lastActiveDate === today) {
        if (prev.lastActiveDate !== today) streak += 1;
      } else if (prev.lastActiveDate !== today) {
        streak = 1;
      }

      const newProgress = {
        ...prev,
        completedDays: newDays,
        lastActiveDate: today,
        currentStreak: streak,
        longestStreak: Math.max(prev.longestStreak, streak),
      };

      const uid = getActiveUserId();
      if (uid) {
        const todayDay = newProgress.completedDays.find(d => d.date === today);
        if (todayDay) syncDay(uid, todayDay).catch(console.error);
      }

      return newProgress;
    });
  };

  return { progress, today, getTodayProgress, getDayNumber, getWordOfTheDay, markWordLearned, updateTodayProgress };
}
