import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { vocabulary } from '../data/vocabulary';
import SpeakButton from '../components/SpeakButton';
import { badges } from '../data/badges';
import type { BadgeStats } from '../data/badges';

function buildCalendar(completedDays: { date: string }[]) {
  const today = new Date();
  const doneSet = new Set(completedDays.map(d => d.date));
  const days: { date: string; done: boolean; future: boolean }[] = [];
  // Show last 10 weeks (70 days)
  for (let i = 69; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    days.push({ date: str, done: doneSet.has(str), future: false });
  }
  return days;
}

export default function ProgressPage() {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const [selectedWord, setSelectedWord] = useState<typeof vocabulary[0] | null>(null);

  const learnedWords = vocabulary.filter(w => progress.wordsLearned.includes(w.id));

  const totalExercises = progress.completedDays.reduce((acc, day) => {
    return acc + (day.vocabQuizDone ? 1 : 0) + (day.conjugationDone ? 1 : 0) + (day.challengeDone ? 1 : 0) + (day.dialogueDone ? 1 : 0);
  }, 0);

  const avgScore = progress.completedDays.length > 0
    ? Math.round(
        progress.completedDays.reduce((acc, day) => {
          let count = 0; let total = 0;
          if (day.vocabScore !== undefined) { total += day.vocabScore; count++; }
          if (day.conjugationScore !== undefined) { total += day.conjugationScore; count++; }
          if (day.challengeScore !== undefined) { total += day.challengeScore; count++; }
          return acc + (count > 0 ? total / count : 0);
        }, 0) / progress.completedDays.length
      )
    : 0;

  const perfectDays = progress.completedDays.filter(
    d => d.vocabQuizDone && d.conjugationDone && d.challengeDone && d.dialogueDone
  ).length;

  const stats: BadgeStats = {
    streak: progress.currentStreak,
    longestStreak: progress.longestStreak,
    wordsLearned: learnedWords.length,
    totalExercises,
    avgScore,
    totalDays: progress.completedDays.length,
    perfectDays,
  };

  const earned = badges.filter(b => b.check(stats));
  const locked = badges.filter(b => !b.check(stats));
  const calDays = buildCalendar(progress.completedDays);

  const downloadRecap = () => {
    const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    let content = `FRENCH DAILY - Resumen de progreso\n${'='.repeat(45)}\nFecha: ${today}\n\n`;
    content += `ESTADISTICAS\n${'-'.repeat(30)}\n`;
    content += `Racha actual: ${progress.currentStreak} dias\nMejor racha: ${progress.longestStreak} dias\n`;
    content += `Palabras aprendidas: ${learnedWords.length}/200\nEjercicios completados: ${totalExercises}\nPuntuacion media: ${avgScore}%\n\n`;
    if (earned.length > 0) {
      content += `MEDALLAS\n${'-'.repeat(30)}\n`;
      earned.forEach(b => { content += `  ${b.emoji} ${b.title} — ${b.desc}\n`; });
      content += '\n';
    }
    if (learnedWords.length > 0) {
      content += `PALABRAS APRENDIDAS\n${'-'.repeat(30)}\n`;
      const byCategory = learnedWords.reduce((acc, w) => {
        if (!acc[w.category]) acc[w.category] = [];
        acc[w.category].push(w);
        return acc;
      }, {} as Record<string, typeof learnedWords>);
      Object.entries(byCategory).forEach(([cat, words]) => {
        content += `\n  ${cat.toUpperCase()}\n`;
        words.forEach(w => {
          content += `    ${w.french} — ${w.english}${w.gender ? ` (${w.gender === 'm' ? 'masc.' : 'fem.'})` : ''}\n`;
        });
      });
    }
    content += `\n\n---\nGenerado por French Daily\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `french-daily-recap-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  return (
    <div className="fade-in">
      <div className="page-title">
        <button className="back-btn" onClick={() => navigate('/')}>&#x2190;</button>
        Progreso
      </div>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-card">
          <div className="stat-value">{progress.currentStreak}</div>
          <div className="stat-label">Racha actual</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{progress.longestStreak}</div>
          <div className="stat-label">Mejor racha</div>
        </div>
      </div>
      <div className="stats-bar">
        <div className="stat-card">
          <div className="stat-value">{learnedWords.length}</div>
          <div className="stat-label">Palabras</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalExercises}</div>
          <div className="stat-label">Ejercicios</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{avgScore}%</div>
          <div className="stat-label">Media</div>
        </div>
      </div>

      {/* Streak heatmap */}
      <div className="card">
        <div className="card-title" style={{ marginBottom: 14 }}>Actividad — últimos 70 días</div>
        <div className="heatmap">
          {calDays.map(d => (
            <div
              key={d.date}
              className={`heatmap-cell ${d.done ? 'done' : ''}`}
              title={d.date}
            />
          ))}
        </div>
        <div className="heatmap-legend">
          <span className="heatmap-cell" style={{ width: 12, height: 12, display: 'inline-block', borderRadius: 3 }} /> Sin actividad
          <span className="heatmap-cell done" style={{ width: 12, height: 12, display: 'inline-block', borderRadius: 3, marginLeft: 12 }} /> Activo
        </div>
      </div>

      {/* Badges */}
      <div className="card">
        <div className="card-title" style={{ marginBottom: 14 }}>
          Medallas {earned.length > 0 && <span className="badge-count">{earned.length}/{badges.length}</span>}
        </div>
        {earned.length > 0 && (
          <div className="badges-grid" style={{ marginBottom: locked.length > 0 ? 16 : 0 }}>
            {earned.map(b => (
              <div key={b.id} className="badge-item earned">
                <div className="badge-emoji">{b.emoji}</div>
                <div className="badge-title">{b.title}</div>
                <div className="badge-desc">{b.desc}</div>
              </div>
            ))}
          </div>
        )}
        {locked.length > 0 && (
          <>
            {earned.length > 0 && <div className="section-label" style={{ marginBottom: 10 }}>Por conseguir</div>}
            <div className="badges-grid">
              {locked.map(b => (
                <div key={b.id} className="badge-item locked">
                  <div className="badge-emoji">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  </div>
                  <div className="badge-title">{b.title}</div>
                  <div className="badge-desc">{b.desc}</div>
                </div>
              ))}
            </div>
          </>
        )}
        {earned.length === 0 && locked.length === 0 && (
          <p style={{ color: 'var(--text-light)', fontSize: 14 }}>Empieza a practicar para ganar medallas.</p>
        )}
      </div>

      {/* Words learned */}
      <div className="card">
        <div className="card-title">Palabras aprendidas ({learnedWords.length}/200)</div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${(learnedWords.length / 200) * 100}%` }} />
        </div>
        {learnedWords.length > 0 ? (
          <div className="words-grid">
            {learnedWords.map(w => (
              <span
                key={w.id}
                className={`word-chip ${selectedWord?.id === w.id ? 'active' : ''}`}
                onClick={() => setSelectedWord(selectedWord?.id === w.id ? null : w)}
              >
                {w.french}
              </span>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-light)', fontSize: 14 }}>
            Completa los quizzes de vocabulario para empezar a construir tu lista.
          </p>
        )}
      </div>

      {/* Download */}
      <div className="download-recap-section">
        <button className="btn btn-ghost" onClick={downloadRecap}>
          Descargar resumen completo
        </button>
      </div>

      {/* Word detail modal */}
      {selectedWord && (
        <div className="word-detail-overlay" onClick={() => setSelectedWord(null)}>
          <div className="word-detail-sheet" onClick={e => e.stopPropagation()}>
            <div className="word-detail-handle" />
            <div className="word-detail-french">
              {selectedWord.french}
              <SpeakButton text={selectedWord.french} />
            </div>
            <div className="word-detail-english">{selectedWord.english}</div>
            <div className="word-detail-meta">
              <span className="word-detail-tag">{selectedWord.category}</span>
              {selectedWord.gender && (
                <span className="word-detail-tag">
                  {selectedWord.gender === 'm' ? 'masculino' : 'femenino'}
                </span>
              )}
            </div>
            <div className="examples">
              <h3>Ejemplos</h3>
              {selectedWord.examples.map((ex, i) => (
                <div key={i} className="example">
                  <div className="example-fr">
                    {ex.french}
                    <SpeakButton text={ex.french} />
                  </div>
                  <div className="example-en">{ex.english}</div>
                </div>
              ))}
            </div>
            <button className="btn btn-outline" onClick={() => setSelectedWord(null)} style={{ marginTop: 16 }}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
