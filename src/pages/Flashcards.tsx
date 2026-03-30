import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { vocabulary } from '../data/vocabulary';
import SpeakButton from '../components/SpeakButton';

const SRS_KEY = 'mb-srs';

interface SrsEntry { wordId: number; score: number; lastSeen: string; }

function loadSrs(): Record<number, SrsEntry> {
  try { return JSON.parse(localStorage.getItem(SRS_KEY) || '{}'); } catch { return {}; }
}

function saveSrs(srs: Record<number, SrsEntry>) {
  localStorage.setItem(SRS_KEY, JSON.stringify(srs));
}

function getToday() {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-${String(n.getDate()).padStart(2,'0')}`;
}

export default function Flashcards() {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const today = getToday();

  const learnedWords = useMemo(
    () => vocabulary.filter(w => progress.wordsLearned.includes(w.id)),
    [progress.wordsLearned]
  );

  // Sort: unseen / low-score / not-seen-today first (light SRS)
  const deck = useMemo(() => {
    const srs = loadSrs();
    return [...learnedWords].sort((a, b) => {
      const sa = srs[a.id];
      const sb = srs[b.id];
      // Unseen first
      if (!sa && sb) return -1;
      if (sa && !sb) return 1;
      if (!sa && !sb) return 0;
      // Seen today → push to end
      const aToday = sa.lastSeen === today ? 1 : 0;
      const bToday = sb.lastSeen === today ? 1 : 0;
      if (aToday !== bToday) return aToday - bToday;
      // Lower score first
      return (sa.score ?? 0) - (sb.score ?? 0);
    });
  }, [learnedWords, today]);

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState({ knew: 0, review: 0 });

  const word = deck[index];

  const handleAnswer = (knew: boolean) => {
    const srs = loadSrs();
    const prev = srs[word.id];
    srs[word.id] = {
      wordId: word.id,
      score: Math.max(0, Math.min(5, (prev?.score ?? 0) + (knew ? 1 : -1))),
      lastSeen: today,
    };
    saveSrs(srs);

    setResults(r => ({ knew: r.knew + (knew ? 1 : 0), review: r.review + (knew ? 0 : 1) }));

    if (index + 1 >= deck.length) {
      setDone(true);
    } else {
      setFlipped(false);
      setTimeout(() => setIndex(i => i + 1), 50);
    }
  };

  if (learnedWords.length === 0) {
    return (
      <div className="fade-in">
        <div className="page-title">
          <button className="back-btn" onClick={() => navigate('/progress')}>&#x2190;</button>
          Flashcards
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '40px 24px' }}>
          <p style={{ color: 'var(--text-light)', fontSize: 15 }}>
            Completa quizzes de vocabulario para tener palabras que repasar aquí.
          </p>
        </div>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((results.knew / deck.length) * 100);
    return (
      <div className="fade-in">
        <div className="page-title">
          <button className="back-btn" onClick={() => navigate('/progress')}>&#x2190;</button>
          Flashcards
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div className={`score-circle ${pct >= 80 ? 'score-great' : pct >= 50 ? 'score-ok' : 'score-poor'}`} style={{ margin: '16px auto' }}>
            {pct}%
          </div>
          <div className="score-message" style={{ marginBottom: 8 }}>
            {pct >= 80 ? 'Excellente mémoire !' : pct >= 50 ? 'Bon travail !' : 'Continue à pratiquer !'}
          </div>
          <div style={{ color: 'var(--text-light)', fontSize: 14, marginBottom: 24 }}>
            {results.knew} sabías · {results.review} a repasar
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => { setIndex(0); setFlipped(false); setDone(false); setResults({ knew: 0, review: 0 }); }}>
              Repetir
            </button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => navigate('/progress')}>
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-title">
        <button className="back-btn" onClick={() => navigate('/progress')}>&#x2190;</button>
        Flashcards
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-light)', marginLeft: 'auto' }}>
          {index + 1}/{deck.length}
        </span>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ height: 4, background: 'var(--border-light)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${((index) / deck.length) * 100}%`, background: 'var(--gradient)', transition: 'width 0.3s ease', borderRadius: 2 }} />
        </div>
      </div>

      {/* Flashcard */}
      <div className="flashcard-scene" onClick={() => !flipped && setFlipped(true)}>
        <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
          {/* Front */}
          <div className="flashcard-front">
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{word.category}</div>
            <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {word.french}
            </div>
            {word.gender && (
              <div style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 6 }}>
                {word.gender === 'm' ? 'masculino' : 'femenino'}
              </div>
            )}
            <div style={{ marginTop: 20, color: 'var(--text-light)', fontSize: 13 }}>Toca para ver la traducción</div>
          </div>

          {/* Back */}
          <div className="flashcard-back">
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{word.french}</div>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 4 }}>
              {word.english}
            </div>
            {word.examples[0] && (
              <div style={{ marginTop: 16, width: '100%' }}>
                <div style={{ fontSize: 14, color: 'var(--text)', fontStyle: 'italic', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {word.examples[0].french}
                  <SpeakButton text={word.examples[0].french} />
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-light)', textAlign: 'center', marginTop: 4 }}>
                  {word.examples[0].english}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Answer buttons — shown after flip */}
      {flipped && (
        <div className="flashcard-actions fade-in">
          <button className="btn flashcard-btn-review" onClick={() => handleAnswer(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Repasar
          </button>
          <button className="btn flashcard-btn-knew" onClick={() => handleAnswer(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>
            Lo sabía
          </button>
        </div>
      )}
    </div>
  );
}
