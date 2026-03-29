import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { vocabulary } from '../data/vocabulary';
import SpeakButton from '../components/SpeakButton';
import type { User } from '../hooks/useUsers';

interface Props {
  activeUser: User;
  onSwitchUser: () => void;
}

export default function Home({ activeUser, onSwitchUser }: Props) {
  const { progress, getTodayProgress, getWordOfTheDay } = useProgress();
  const todayProgress = getTodayProgress();
  const wordIndex = getWordOfTheDay(vocabulary.length);
  const todayWord = vocabulary[wordIndex];

  return (
    <div className="fade-in">
      <div className="header">
        <div className="user-pill" onClick={onSwitchUser}>
          <span className="user-pill-emoji">{activeUser.emoji}</span>
          <span className="user-pill-name">{activeUser.name}</span>
          <span className="user-pill-switch">cambiar</span>
        </div>
        <h1>Bonjour !</h1>
        <p>Tu practica diaria de frances</p>
      </div>

      <div className="stats-bar">
        <div className="stat-card">
          <div className="stat-value">{progress.currentStreak}</div>
          <div className="stat-label">Dias seguidos</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{progress.wordsLearned.length}</div>
          <div className="stat-label">Palabras</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{progress.completedDays.length}</div>
          <div className="stat-label">Dias activos</div>
        </div>
      </div>

      {todayWord && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Palabra del dia</span>
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
      )}

      <Link to="/vocabulary" className={`module-card ${todayProgress?.vocabQuizDone ? 'done' : ''}`}>
        <div className="module-icon">&#x1F4D6;</div>
        <div className="module-info">
          <div className="module-title">Quiz de vocabulario</div>
          <div className="module-desc">Pon a prueba tus conocimientos</div>
        </div>
        <div className="module-status">
          {todayProgress?.vocabQuizDone ? '\u2705' : '\u27A1\uFE0F'}
        </div>
      </Link>

      <Link to="/conjugation" className={`module-card ${todayProgress?.conjugationDone ? 'done' : ''}`}>
        <div className="module-icon">&#x270D;&#xFE0F;</div>
        <div className="module-info">
          <div className="module-title">Conjugacion</div>
          <div className="module-desc">Practica las conjugaciones verbales</div>
        </div>
        <div className="module-status">
          {todayProgress?.conjugationDone ? '\u2705' : '\u27A1\uFE0F'}
        </div>
      </Link>

      <Link to="/challenge" className={`module-card ${todayProgress?.challengeDone ? 'done' : ''}`}>
        <div className="module-icon">&#x1F3AF;</div>
        <div className="module-info">
          <div className="module-title">Reto del dia</div>
          <div className="module-desc">Tu mision en frances para hoy</div>
        </div>
        <div className="module-status">
          {todayProgress?.challengeDone ? '\u2705' : '\u27A1\uFE0F'}
        </div>
      </Link>

      <Link to="/dialogues" className={`module-card ${todayProgress?.dialogueDone ? 'done' : ''}`}>
        <div className="module-icon">&#x1F4AC;</div>
        <div className="module-info">
          <div className="module-title">Diálogo del día</div>
          <div className="module-desc">Practica conversaciones reales</div>
        </div>
        <div className="module-status">
          {todayProgress?.dialogueDone ? '\u2705' : '\u27A1\uFE0F'}
        </div>
      </Link>
    </div>
  );
}
