import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { vocabulary } from '../data/vocabulary';
import SpeakButton from '../components/SpeakButton';

export default function ProgressPage() {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const [selectedWord, setSelectedWord] = useState<typeof vocabulary[0] | null>(null);

  const learnedWords = vocabulary.filter(w => progress.wordsLearned.includes(w.id));

  const totalExercises = progress.completedDays.reduce((acc, day) => {
    return acc + (day.vocabQuizDone ? 1 : 0) + (day.conjugationDone ? 1 : 0) + (day.challengeDone ? 1 : 0);
  }, 0);

  const avgScore = progress.completedDays.length > 0
    ? Math.round(
        progress.completedDays.reduce((acc, day) => {
          let count = 0;
          let total = 0;
          if (day.vocabScore !== undefined) { total += day.vocabScore; count++; }
          if (day.conjugationScore !== undefined) { total += day.conjugationScore; count++; }
          if (day.challengeScore !== undefined) { total += day.challengeScore; count++; }
          return acc + (count > 0 ? total / count : 0);
        }, 0) / progress.completedDays.length
      )
    : 0;

  const downloadRecap = () => {
    const today = new Date().toLocaleDateString('es-ES', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    let content = `FRENCH DAILY - Resumen de progreso\n`;
    content += `${'='.repeat(45)}\n`;
    content += `Fecha: ${today}\n\n`;

    content += `ESTADISTICAS\n`;
    content += `${'-'.repeat(30)}\n`;
    content += `Racha actual: ${progress.currentStreak} dias\n`;
    content += `Mejor racha: ${progress.longestStreak} dias\n`;
    content += `Palabras aprendidas: ${learnedWords.length}/200\n`;
    content += `Ejercicios completados: ${totalExercises}\n`;
    content += `Puntuacion media: ${avgScore}%\n\n`;

    if (learnedWords.length > 0) {
      content += `PALABRAS APRENDIDAS\n`;
      content += `${'-'.repeat(30)}\n`;

      const byCategory = learnedWords.reduce((acc, w) => {
        if (!acc[w.category]) acc[w.category] = [];
        acc[w.category].push(w);
        return acc;
      }, {} as Record<string, typeof learnedWords>);

      Object.entries(byCategory).forEach(([cat, words]) => {
        content += `\n  ${cat.toUpperCase()}\n`;
        words.forEach(w => {
          content += `    ${w.french} — ${w.english}`;
          if (w.gender) content += ` (${w.gender === 'm' ? 'masc.' : 'fem.'})`;
          content += `\n`;
          w.examples.forEach(ex => {
            content += `      "${ex.french}"\n`;
            content += `       ${ex.english}\n`;
          });
        });
      });
    }

    if (progress.completedDays.length > 0) {
      content += `\n\nHISTORIAL DE ACTIVIDAD\n`;
      content += `${'-'.repeat(30)}\n`;
      [...progress.completedDays].reverse().slice(0, 30).forEach(day => {
        const activities = [];
        if (day.vocabQuizDone) activities.push(`Vocab ${day.vocabScore ?? '-'}%`);
        if (day.conjugationDone) activities.push(`Conjugacion ${day.conjugationScore ?? '-'}%`);
        if (day.challengeDone) activities.push(`Reto ${day.challengeScore ?? '-'}%`);
        content += `  ${day.date}: ${activities.length > 0 ? activities.join(' | ') : 'Sin actividad'}\n`;
      });
    }

    content += `\n\n---\nGenerado por French Daily\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `french-daily-recap-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fade-in">
      <div className="page-title">
        <button className="back-btn" onClick={() => navigate('/')}>
          &#x2190;
        </button>
        Progreso
      </div>

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

      <div className="card">
        <div className="card-title">Palabras aprendidas ({learnedWords.length}/200)</div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${(learnedWords.length / 200) * 100}%` }}
          />
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
            Completa los quizzes de vocabulario para empezar a construir tu lista de palabras.
          </p>
        )}
      </div>

      <div className="card">
        <div className="card-title">Historial de actividad</div>
        {progress.completedDays.length > 0 ? (
          <div style={{ marginTop: 12 }}>
            {[...progress.completedDays].reverse().slice(0, 10).map(day => (
              <div key={day.date} className="activity-row">
                <span className="activity-date">{day.date}</span>
                <span className="activity-icons">
                  <span style={{ opacity: day.vocabQuizDone ? 1 : 0.2 }}>&#x1F4D6;</span>
                  <span style={{ opacity: day.conjugationDone ? 1 : 0.2 }}>&#x270D;&#xFE0F;</span>
                  <span style={{ opacity: day.challengeDone ? 1 : 0.2 }}>&#x1F3AF;</span>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-light)', fontSize: 14, marginTop: 12 }}>
            Sin actividad todavia. Empieza a practicar hoy!
          </p>
        )}
      </div>

      <div className="download-recap-section">
        <button className="btn btn-ghost" onClick={downloadRecap}>
          Descargar resumen completo
        </button>
      </div>

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
            <button
              className="btn btn-outline"
              onClick={() => setSelectedWord(null)}
              style={{ marginTop: 16 }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
