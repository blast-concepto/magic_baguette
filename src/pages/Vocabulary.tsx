import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { vocabulary } from '../data/vocabulary';
import { useProgress } from '../hooks/useProgress';
import SpeakButton from '../components/SpeakButton';

interface QuizQuestion {
  word: typeof vocabulary[0];
  options: string[];
  correctIndex: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuiz(count: number, category?: string): QuizQuestion[] {
  const pool = category ? vocabulary.filter(w => w.category === category) : vocabulary;
  const words = shuffle(pool).slice(0, Math.min(count, pool.length));
  return words.map(word => {
    const wrongAnswers = shuffle(vocabulary.filter(w => w.id !== word.id)).slice(0, 3).map(w => w.english);
    const options = shuffle([word.english, ...wrongAnswers]);
    return { word, options, correctIndex: options.indexOf(word.english) };
  });
}

function speakFrench(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'fr-FR';
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

export default function Vocabulary() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterCategory = searchParams.get('category') ?? undefined;
  const { markWordLearned, updateTodayProgress, getWordOfTheDay } = useProgress();

  const wordIndex = getWordOfTheDay(vocabulary.length);
  const todayWord = vocabulary[wordIndex];

  const [phase, setPhase] = useState<'learn' | 'quiz' | 'results'>('learn');
  const [listenMode, setListenMode] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const categoryLabel = filterCategory
    ? filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)
    : undefined;

  const startQuiz = useCallback(() => {
    setQuestions(generateQuiz(5, filterCategory));
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setAnswered(false);
    setPhase('quiz');
  }, [filterCategory]);

  // Auto-start quiz when coming from Units page with a category
  useEffect(() => {
    if (filterCategory) startQuiz();
  }, [filterCategory, startQuiz]);

  // Auto-speak in listen mode when question changes
  useEffect(() => {
    if (phase === 'quiz' && listenMode && questions[currentQ]) {
      setTimeout(() => speakFrench(questions[currentQ].word.french), 200);
    }
  }, [phase, listenMode, currentQ, questions]);

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === questions[currentQ].correctIndex) {
      setScore(s => s + 1);
      markWordLearned(questions[currentQ].word.id);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      updateTodayProgress({ vocabQuizDone: true, vocabScore: Math.round((score / questions.length) * 100) });
      setPhase('results');
    }
  };

  const scorePercent = useMemo(() => {
    if (questions.length === 0) return 0;
    return Math.round((score / questions.length) * 100);
  }, [score, questions.length]);

  return (
    <div className="fade-in">
      <div className="page-title">
        <button className="back-btn" onClick={() => filterCategory ? navigate('/units') : navigate('/')}>&#x2190;</button>
        {categoryLabel ?? 'Vocabulario'}
      </div>

      {phase === 'learn' && !filterCategory && todayWord && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="card-title">Palabra de hoy</span>
              <span className="word-category">{todayWord.category}</span>
            </div>
            <div className="word-display">
              <div className="word-french">
                {todayWord.french}
                <SpeakButton text={todayWord.french} />
              </div>
              {todayWord.gender && <div className="word-gender">{todayWord.gender === 'm' ? 'masculino' : 'femenino'}</div>}
              <div className="word-english">{todayWord.english}</div>
            </div>
            <div className="examples">
              <h3>Ejemplos</h3>
              {todayWord.examples.map((ex, i) => (
                <div key={i} className="example">
                  <div className="example-fr">{ex.french}<SpeakButton text={ex.french} /></div>
                  <div className="example-en">{ex.english}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mode toggle */}
          <div className="listen-mode-toggle">
            <span>Modo escucha</span>
            <button
              className={`toggle-btn ${listenMode ? 'on' : ''}`}
              onClick={() => setListenMode(m => !m)}
              aria-label="Activar modo escucha"
            >
              <div className="toggle-thumb" />
            </button>
          </div>

          <button className="btn btn-primary" onClick={() => { markWordLearned(todayWord.id); startQuiz(); }}>
            Empezar quiz (5 preguntas)
          </button>
        </>
      )}

      {phase === 'quiz' && questions.length > 0 && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Pregunta {currentQ + 1}/{questions.length}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className={`card-badge ${score > 0 ? 'badge-done' : 'badge-todo'}`}>
                {score}/{currentQ + (answered ? 1 : 0)}
              </span>
              <button
                className={`toggle-btn ${listenMode ? 'on' : ''}`}
                style={{ width: 36, height: 20 }}
                onClick={() => {
                  const next = !listenMode;
                  setListenMode(next);
                  if (next) speakFrench(questions[currentQ].word.french);
                }}
                aria-label="Modo escucha"
              >
                <div className="toggle-thumb" style={{ width: 14, height: 14 }} />
              </button>
            </div>
          </div>

          {listenMode ? (
            <div className="listen-mode-question">
              <button className="listen-play-btn" onClick={() => speakFrench(questions[currentQ].word.french)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M19.07 4.93a10 10 0 010 14.14"/></svg>
              </button>
              <p style={{ color: 'var(--text-light)', fontSize: 13, marginTop: 10 }}>Escucha y elige la traducción</p>
              {answered && (
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--primary)', marginTop: 8 }}>
                  {questions[currentQ].word.french}
                </div>
              )}
            </div>
          ) : (
            <div className="quiz-question">
              ¿Qué significa <strong>"{questions[currentQ].word.french}"</strong>?
              <SpeakButton text={questions[currentQ].word.french} />
            </div>
          )}

          <div className="quiz-options">
            {questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                className={`quiz-option ${answered ? 'disabled' : ''} ${answered && i === questions[currentQ].correctIndex ? 'correct' : ''} ${answered && i === selected && i !== questions[currentQ].correctIndex ? 'wrong' : ''}`}
                onClick={() => handleAnswer(i)}
              >
                {opt}
              </button>
            ))}
          </div>

          {answered && (
            <button className="btn btn-primary" onClick={nextQuestion} style={{ marginTop: 16 }}>
              {currentQ + 1 < questions.length ? 'Siguiente' : 'Ver resultados'}
            </button>
          )}
        </div>
      )}

      {phase === 'results' && (
        <div className="card">
          <div className="score-display">
            <div className={`score-circle ${scorePercent >= 80 ? 'score-great' : scorePercent >= 50 ? 'score-ok' : 'score-poor'}`}>
              {scorePercent}%
            </div>
            <div className="score-message">
              {scorePercent >= 80 ? 'Excellent !' : scorePercent >= 50 ? 'Pas mal !' : 'Continue !'}
            </div>
            <div className="score-detail">{score}/{questions.length} respuestas correctas</div>
          </div>
          <button className="btn btn-primary" onClick={startQuiz}>Intentar de nuevo</button>
          <button className="btn btn-outline" onClick={() => filterCategory ? navigate('/units') : navigate('/')}>Volver</button>
        </div>
      )}
    </div>
  );
}
