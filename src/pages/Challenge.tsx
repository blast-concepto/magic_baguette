import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dailyChallenges } from '../data/dailyChallenges';
import { useProgress } from '../hooks/useProgress';
import SpeakButton from '../components/SpeakButton';

export default function Challenge() {
  const navigate = useNavigate();
  const { updateTodayProgress, getDayNumber } = useProgress();

  const dayNum = getDayNumber();
  const challenge = dailyChallenges[dayNum % dailyChallenges.length];

  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    updateTodayProgress({ challengeDone: true, challengeScore: 100 });
  };

  return (
    <div className="fade-in">
      <div className="page-title">
        <button className="back-btn" onClick={() => navigate('/')}>
          &#x2190;
        </button>
        Reto del dia
      </div>

      <div className="reto-mission-card">
        <div className="reto-icon">{challenge.icon}</div>
        <div className="reto-mission-title">{challenge.title}</div>
        <div className="reto-mission-title-fr">{challenge.titleFr}</div>
        <div className="reto-difficulty">
          {[1, 2, 3].map(d => (
            <span key={d} className={`reto-difficulty-dot ${d <= challenge.difficulty ? 'filled' : ''}`} />
          ))}
        </div>
        <div style={{ marginTop: 8 }}>
          <span className="reto-category">{challenge.category}</span>
        </div>
      </div>

      <div className="reto-mission-desc">
        {challenge.mission}
      </div>

      <div className="reto-key-phrase">
        <div className="reto-key-phrase-label">Frase clave</div>
        <div className="reto-key-phrase-fr">
          {challenge.keyPhrase}
          <SpeakButton text={challenge.keyPhrase} />
        </div>
        <div className="reto-key-phrase-es">{challenge.keyPhraseTranslation}</div>
      </div>

      <div className="reto-extra-phrases">
        <div className="section-label">Frases utiles para tu mision</div>
        {challenge.extraPhrases.map((phrase, i) => (
          <div key={i} className="reto-extra-phrase">
            <div className="reto-extra-phrase-text">
              <div className="reto-extra-phrase-fr">{phrase.french}</div>
              <div className="reto-extra-phrase-es">{phrase.spanish}</div>
            </div>
            <SpeakButton text={phrase.french} />
          </div>
        ))}
      </div>

      <div className="reto-tip">
        <div className="reto-tip-label">Conseil du jour</div>
        {challenge.tip}
      </div>

      {!completed ? (
        <button className="btn btn-primary" onClick={handleComplete}>
          Lo hice hoy!
        </button>
      ) : (
        <div className="slide-up">
          <div className="reto-completed">
            <div className="reto-completed-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <div className="reto-completed-text">Bravo !</div>
            <div className="reto-completed-sub">Has completado el reto de hoy</div>
          </div>
          <button className="btn btn-outline" onClick={() => navigate('/')}>
            Volver al inicio
          </button>
        </div>
      )}
    </div>
  );
}
