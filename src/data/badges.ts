export interface Badge {
  id: string;
  emoji: string;
  title: string;
  desc: string;
  check: (stats: BadgeStats) => boolean;
}

export interface BadgeStats {
  streak: number;
  longestStreak: number;
  wordsLearned: number;
  totalExercises: number;
  avgScore: number;
  totalDays: number;
  perfectDays: number; // days with all 4 activities done
}

export const badges: Badge[] = [
  // Streak badges
  { id: 'streak3',   emoji: '🔥', title: 'En racha',        desc: '3 días seguidos',         check: s => s.streak >= 3 },
  { id: 'streak7',   emoji: '⚡', title: 'Semana completa', desc: '7 días seguidos',          check: s => s.streak >= 7 },
  { id: 'streak30',  emoji: '🌟', title: 'Mes de fuego',    desc: '30 días seguidos',         check: s => s.streak >= 30 },
  { id: 'streak100', emoji: '👑', title: 'Légende',         desc: '100 días seguidos',        check: s => s.streak >= 100 },

  // Vocabulary badges
  { id: 'words10',   emoji: '📖', title: 'Primer paso',     desc: '10 palabras aprendidas',   check: s => s.wordsLearned >= 10 },
  { id: 'words50',   emoji: '📚', title: 'Vocabulista',     desc: '50 palabras aprendidas',   check: s => s.wordsLearned >= 50 },
  { id: 'words100',  emoji: '🧠', title: 'Lexicólogo',      desc: '100 palabras aprendidas',  check: s => s.wordsLearned >= 100 },
  { id: 'words200',  emoji: '🎓', title: 'Maître des mots', desc: '200 palabras aprendidas',  check: s => s.wordsLearned >= 200 },

  // Score badges
  { id: 'perfect1',  emoji: '✨', title: 'Perfection',      desc: 'Primera puntuacion 100%',  check: s => s.avgScore >= 100 },
  { id: 'avg80',     emoji: '🏆', title: 'Excellence',      desc: 'Media superior al 80%',    check: s => s.avgScore >= 80 && s.totalDays >= 5 },

  // Consistency badges
  { id: 'days7',     emoji: '📅', title: 'Primera semana',  desc: '7 días activos en total',  check: s => s.totalDays >= 7 },
  { id: 'days30',    emoji: '🗓️', title: 'Mes actif',       desc: '30 días activos en total', check: s => s.totalDays >= 30 },
  { id: 'perfect5',  emoji: '💎', title: 'Diamante',        desc: '5 días con todo completado', check: s => s.perfectDays >= 5 },
];
