import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { vocabulary } from '../data/vocabulary';
import SpeakButton from '../components/SpeakButton';
import { useSpeech } from '../hooks/useSpeech';

const SRS_KEY = 'mb-srs';

interface SrsEntry { wordId: number; score: number; lastSeen: string; }

type QuizMode = 'fr-es' | 'es-fr' | 'listen' | 'context';

interface QuizCard {
  word: typeof vocabulary[0];
  mode: QuizMode;
  options: string[];
  correctIndex: number;
}

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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickMode(word: typeof vocabulary[0]): QuizMode {
  const hasExample = word.examples?.length > 0;
  const ex0 = hasExample ? word.examples[0].french : '';
  const canContext = hasExample && ex0.toLowerCase().includes(word.french.toLowerCase());

  const r = Math.random();
  if (canContext) {
    if (r < 0.30) return 'fr-es';
    if (r < 0.60) return 'es-fr';
    if (r < 0.80) return 'listen';
    return 'context';
  }
  if (r < 0.40) return 'fr-es';
  if (r < 0.70) return 'es-fr';
  return 'listen';
}

function buildCard(word: typeof vocabulary[0]): QuizCard {
  const mode = pickMode(word);
  const others = shuffle(vocabulary.filter(w => w.id !== word.id));

  if (mode === 'es-fr') {
    const wrongs = others.slice(0, 3).map(w => w.french);
    const options = shuffle([word.french, ...wrongs]);
    return { word, mode, options, correctIndex: options.indexOf(word.french) };
  }
  if (mode === 'context') {
    const wrongs = others.slice(0, 3).map(w => w.french);
    const options = shuffle([word.french, ...wrongs]);
    return { word, mode, options, correctIndex: options.indexOf(word.french) };
  }
  // fr-es and listen: options are English/Spanish meanings
  const wrongs = others.slice(0, 3).map(w => w.english);
  const options = shuffle([word.english, ...wrongs]);
  return { word, mode, options, correctIndex: options.indexOf(word.english) };
}

const MODE_LABELS: Record<QuizMode, string> = {
  'fr-es': 'Frances → Español',
  'es-fr': 'Español → Francés',
  'listen': 'Escucha',
  'context': 'En contexto',
};

const MODE_COLORS: Record<QuizMode, string> = {
  'fr-es': 'var(--primary)',
  'es-fr': '#10b981',
  'listen': '#f59e0b',
  'context': '#8b5cf6',
};

export default function Flashcards() {
  const navigate = useNavigate();
  const { speak } = useSpeech();
  const { progress } = useProgress();
  const today = getToday();

  const learnedWords = useMemo(
    () => vocabulary.filter(w => progress.wordsLearned.includes(w.id)),
    [progress.wordsLearned]
  );

  // Sort: unseen / low-score / not-seen-today first (SRS)
  const sortedWords = useMemo(() => {
    const srs = loadSrs();
    return [...learnedWords].sort((a, b) => {
      const sa = srs[a.id];
      const sb = srs[b.id];
      if (!sa && sb) return -1;
      if (sa && !sb) return 1;
      if (!sa && !sb) return 0;
      const aToday = sa.lastSeen === today ? 1 : 0;
      const bToday = sb.lastSeen === today ? 1 : 0;
      if (aToday !== bToday) return aToday - bToday;
      return (sa.score ?? 0) - (sb.score ?? 0);
    });
  }, [learnedWords, today]);

  const deck = useMemo(() => sortedWords.map(buildCard), [sortedWords]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState({ correct: 0, wrong: 0 });

  const card = deck[index];

  // Auto-speak for listen mode when card changes
  useEffect(() => {
    if (!card || card.mode !== 'listen') return;
    const t = setTimeout(() => speak(card.word.french), 300);
    return () => clearTimeout(t);
  }, [index, card?.mode]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAnswer = (idx: number) => {
    if (answered || !card) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === card.correctIndex;

    const srs = loadSrs();
    const prev = srs[card.word.id];
    srs[card.word.id] = {
      wordId: card.word.id,
      score: Math.max(0, Math.min(5, (prev?.score ?? 0) + (correct ? 1 : -1))),
      lastSeen: today,
    };
    saveSrs(srs);
    setResults(r => ({ correct: r.correct + (correct ? 1 : 0), wrong: r.wrong + (correct ? 0 : 1) }));
  };

  const next = () => {
    if (index + 1 >= deck.length) {
      setDone(true);
    } else {
      setSelected(null);
      setAnswered(false);
      setIndex(i => i + 1);
    }
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    setDone(false);
    setResults({ correct: 0, wrong: 0 });
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
    const pct = deck.length > 0 ? Math.round((results.correct / deck.length) * 100) : 0;
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
            {results.correct} correctas · {results.wrong} incorrectas
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={restart}>
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

  if (!card) return null;

  const { word, mode } = card;
  const ex0 = word.examples?.[0];
  const contextSentence = ex0
    ? ex0.french.replace(new RegExp(word.french, 'i'), '___')
    : '';

  return (
    <div className="fade-in">
      <div className="page-title">
        <button className="back-btn" onClick={() => navigate('/progress')}>&#x2190;</button>
        Flashcards
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-light)', marginLeft: 'auto' }}>
          {index + 1}/{deck.length}
        </span>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ height: 4, background: 'var(--border-light)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(index / deck.length) * 100}%`, background: 'var(--gradient)', transition: 'width 0.3s ease', borderRadius: 2 }} />
        </div>
      </div>

      <div className="card">
        {/* Mode badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
            color: MODE_COLORS[mode], background: MODE_COLORS[mode] + '18',
            padding: '3px 10px', borderRadius: 20,
          }}>
            {MODE_LABELS[mode]}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-light)' }}>{word.category}</span>
        </div>

        {/* Prompt */}
        {mode === 'fr-es' && (
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 6 }}>
              {word.french}
            </div>
            {word.gender && <div style={{ fontSize: 13, color: 'var(--text-light)', marginBottom: 8 }}>{word.gender === 'm' ? 'masculino' : 'femenino'}</div>}
            <SpeakButton text={word.french} />
            <div style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 10 }}>¿Qué significa en español?</div>
          </div>
        )}

        {mode === 'es-fr' && (
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 8 }}>
              {word.english}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-light)' }}>¿Cómo se dice en francés?</div>
          </div>
        )}

        {mode === 'listen' && (
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <button
              className="listen-play-btn"
              onClick={() => speak(word.french)}
              style={{ margin: '0 auto 10px' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 010 7.07"/>
                <path d="M19.07 4.93a10 10 0 010 14.14"/>
              </svg>
            </button>
            {answered && (
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>{word.french}</div>
            )}
            <div style={{ fontSize: 13, color: 'var(--text-light)' }}>Escucha y elige la traducción</div>
          </div>
        )}

        {mode === 'context' && (
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 16, fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.6, marginBottom: 8 }}>
              «{contextSentence}»
            </div>
            {ex0 && <div style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 8 }}>{ex0.english}</div>}
            <div style={{ fontSize: 13, color: 'var(--text-light)' }}>¿Qué palabra falta?</div>
          </div>
        )}

        {/* Options */}
        <div className="quiz-options">
          {card.options.map((opt, i) => (
            <button
              key={i}
              className={`quiz-option
                ${answered ? 'disabled' : ''}
                ${answered && i === card.correctIndex ? 'correct' : ''}
                ${answered && i === selected && i !== card.correctIndex ? 'wrong' : ''}
              `}
              onClick={() => handleAnswer(i)}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Feedback + Next */}
        {answered && (
          <div className="fade-in" style={{ marginTop: 16 }}>
            {selected === card.correctIndex ? (
              <div style={{ color: 'var(--success)', fontWeight: 700, fontSize: 14, textAlign: 'center', marginBottom: 10 }}>
                ¡Correcto!{mode === 'es-fr' || mode === 'context' ? ` — ${word.french}` : ` — ${word.english}`}
              </div>
            ) : (
              <div style={{ color: 'var(--error, #ef4444)', fontWeight: 600, fontSize: 14, textAlign: 'center', marginBottom: 10 }}>
                La respuesta era: <strong>{mode === 'es-fr' || mode === 'context' ? word.french : word.english}</strong>
              </div>
            )}
            {ex0 && mode !== 'context' && (
              <div style={{ fontSize: 13, color: 'var(--text-light)', textAlign: 'center', fontStyle: 'italic', marginBottom: 12 }}>
                {ex0.french}
              </div>
            )}
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={next}>
              {index + 1 < deck.length ? 'Siguiente' : 'Ver resultados'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
