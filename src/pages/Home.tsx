import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { vocabulary } from '../data/vocabulary';
import SpeakButton from '../components/SpeakButton';
import Avatar from '../components/Avatar';
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
          <Avatar name={activeUser.name} size={28} fontSize={12} radius="50%" />
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
        <div className="module-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
        </div>
        <div className="module-info">
          <div className="module-title">Quiz de vocabulario</div>
          <div className="module-desc">Pon a prueba tus conocimientos</div>
        </div>
        <div className="module-status">
          {todayProgress?.vocabQuizDone
            ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>}
        </div>
      </Link>

      <Link to="/conjugation" className={`module-card ${todayProgress?.conjugationDone ? 'done' : ''}`}>
        <div className="module-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
        </div>
        <div className="module-info">
          <div className="module-title">Conjugacion</div>
          <div className="module-desc">Practica las conjugaciones verbales</div>
        </div>
        <div className="module-status">
          {todayProgress?.conjugationDone
            ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>}
        </div>
      </Link>

      <Link to="/challenge" className={`module-card ${todayProgress?.challengeDone ? 'done' : ''}`}>
        <div className="module-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        </div>
        <div className="module-info">
          <div className="module-title">Reto del dia</div>
          <div className="module-desc">Tu mision en frances para hoy</div>
        </div>
        <div className="module-status">
          {todayProgress?.challengeDone
            ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>}
        </div>
      </Link>

      <Link to="/units" className="module-card">
        <div className="module-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        </div>
        <div className="module-info">
          <div className="module-title">Unidades temáticas</div>
          <div className="module-desc">Practica por tema: comida, viajes…</div>
        </div>
        <div className="module-status">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </Link>

      <Link to="/dialogues" className={`module-card ${todayProgress?.dialogueDone ? 'done' : ''}`}>
        <div className="module-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        </div>
        <div className="module-info">
          <div className="module-title">Diálogo del día</div>
          <div className="module-desc">Practica conversaciones reales</div>
        </div>
        <div className="module-status">
          {todayProgress?.dialogueDone
            ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>}
        </div>
      </Link>
    </div>
  );
}
