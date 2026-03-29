import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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

function generateQuiz(count: number): QuizQuestion[] {
  const words = shuffle(vocabulary).slice(0, count);
  return words.map(word => {
    const wrongAnswers = shuffle(
      vocabulary.filter(w => w.id !== word.id)
    ).slice(0, 3).map(w => w.english);
    const options = shuffle([word.english, ...wrongAnswers]);
    return {
      word,
      options,
      correctIndex: options.indexOf(word.english),
    };
  });
}

export default function Vocabulary() {
  const navigate = useNavigate();
  const { markWordLearned, updateTodayProgress, getWordOfTheDay } = useProgress();
  const wordIndex = getWordOfTheDay(vocabulary.length);
  const todayWord = vocabulary[wordIndex];

  const [phase, setPhase] = useState<'learn' | 'quiz' | 'results'>('learn');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const startQuiz = useCallback(() => {
    setQuestions(generateQuiz(5));
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setAnswered(false);
    setPhase('quiz');
  }, []);

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
      const finalScore = score;
      updateTodayProgress({
        vocabQuizDone: true,
        vocabScore: Math.round((finalScore / questions.length) * 100),
      });
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
        <button className="back-btn" onClick={() => navigate('/')}>
          &#x2190;
        </button>
        Vocabulario
      </div>

      {phase === 'learn' && todayWord && (
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
              {todayWord.gender && (
                <div className="word-gender">
                  {todayWord.gender === 'm' ? 'masculino' : 'femenino'}
                </div>
              )}
              <div className="word-english">{todayWord.english}</div>
            </div>
            <div className="examples">
              <h3>Ejemplos</h3>
              {todayWord.examples.map((ex, i) => (
                <div key={i} className="example">
                  <div className="example-fr">
                  {ex.french}
                  <SpeakButton text={ex.french} />
                </div>
                  <div className="example-en">{ex.english}</div>
                </div>
              ))}
            </div>
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
            <span className={`card-badge ${score > 0 ? 'badge-done' : 'badge-todo'}`}>
              {score}/{currentQ + (answered ? 1 : 0)}
            </span>
          </div>

          <div className="quiz-question">
            Que significa <strong>"{questions[currentQ].word.french}"</strong> ?
            <SpeakButton text={questions[currentQ].word.french} />
          </div>

          <div className="quiz-options">
            {questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                className={`quiz-option ${answered ? 'disabled' : ''} ${
                  answered && i === questions[currentQ].correctIndex ? 'correct' : ''
                } ${answered && i === selected && i !== questions[currentQ].correctIndex ? 'wrong' : ''}`}
                onClick={() => handleAnswer(i)}
              >
                {opt}
              </button>
            ))}
          </div>

          {answered && (
            <button className="btn btn-primary" onClick={nextQuestion} style={{ marginTop: 16 }}>
              {currentQ + 1 < questions.length ? 'Siguiente pregunta' : 'Ver resultados'}
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
            <div className="score-detail">
              {score}/{questions.length} respuestas correctas
            </div>
          </div>
          <button className="btn btn-primary" onClick={startQuiz}>
            Intentar de nuevo
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/')}>
            Volver al inicio
          </button>
        </div>
      )}
    </div>
  );
}
