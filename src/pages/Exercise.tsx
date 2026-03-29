import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { challenges } from '../data/challenges';
import { useProgress } from '../hooks/useProgress';
import SpeakButton from '../components/SpeakButton';

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, "'")
    .replace(/\s+/g, ' ');
}

export default function Exercise() {
  const navigate = useNavigate();
  const { updateTodayProgress, getDayNumber } = useProgress();

  const dayNum = getDayNumber();
  // Offset from dailyChallenges so we get variety
  const challenge = challenges[(dayNum + 3) % challenges.length];

  const [answers, setAnswers] = useState<string[]>(
    new Array(challenge.blanks.length).fill('')
  );
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (idx: number, value: string) => {
    setAnswers(prev => { const n = [...prev]; n[idx] = value; return n; });
  };

  const checkAnswers = () => {
    const res = challenge.blanks.map((blank, i) =>
      normalize(answers[i]) === normalize(blank.answer)
    );
    setResults(res);
    setChecked(true);
    const correct = res.filter(Boolean).length;
    const score = Math.round((correct / res.length) * 100);
    updateTodayProgress({ challengeDone: true, challengeScore: score });
  };

  const score = useMemo(() => results.filter(Boolean).length, [results]);

  const getFullFrench = (text: string) =>
    text.replace(/___(\d+)___/g, (_, n) => challenge.blanks[parseInt(n) - 1]?.answer ?? '');

  const renderText = (text: string) => {
    const parts = text.split(/(___\d+___)/g);
    return parts.map((part, i) => {
      const match = part.match(/___(\d+)___/);
      if (match) {
        const blankIdx = parseInt(match[1]) - 1;
        return (
          <span key={i} style={{ display: 'inline-block', verticalAlign: 'bottom' }}>
            {!checked ? (
              <input
                ref={el => { inputRefs.current[blankIdx] = el; }}
                className="blank-input"
                value={answers[blankIdx] || ''}
                onChange={e => handleInput(blankIdx, e.target.value)}
                placeholder={challenge.blanks[blankIdx]?.hint || '...'}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    const next = inputRefs.current[blankIdx + 1];
                    if (next) next.focus();
                    else if (!checked) checkAnswers();
                  }
                }}
                style={{ width: Math.max(90, (challenge.blanks[blankIdx]?.answer.length || 8) * 11) }}
              />
            ) : (
              <span className={`blank-result ${results[blankIdx] ? 'correct' : 'wrong'}`}>
                {!results[blankIdx] && answers[blankIdx] && (
                  <span style={{ textDecoration: 'line-through', opacity: 0.4, marginRight: 4 }}>
                    {answers[blankIdx]}
                  </span>
                )}
                <strong>{challenge.blanks[blankIdx]?.answer}</strong>
              </span>
            )}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="fade-in">
      <div className="page-title">
        <button className="back-btn" onClick={() => navigate('/')}>&#x2190;</button>
        Ejercicio del día
      </div>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div className="challenge-title">{challenge.title}</div>
          <span className="difficulty">
            {[1, 2, 3].map(d => (
              <span key={d} className={`difficulty-dot ${d <= challenge.difficulty ? 'filled' : ''}`} />
            ))}
          </span>
        </div>
        <div className="challenge-title-fr">{challenge.titleFr}</div>

        <div className="challenge-situation">{challenge.situation}</div>

        <div className="dialogue">
          {challenge.dialogue.map((line, i) => (
            <div key={i} className="dialogue-line">
              <div className="dialogue-speaker">{line.speaker}</div>
              <div className="dialogue-text">
                {renderText(line.text)}
                {checked && <SpeakButton text={getFullFrench(line.text)} />}
              </div>
            </div>
          ))}
        </div>

        {!checked ? (
          <button className="btn btn-primary" onClick={checkAnswers}>
            Verificar respuestas
          </button>
        ) : (
          <div>
            <div className="score-display" style={{ padding: '16px 0' }}>
              <div className={`score-circle ${score === challenge.blanks.length ? 'score-great' : score >= challenge.blanks.length * 0.6 ? 'score-ok' : 'score-poor'}`}>
                {Math.round((score / challenge.blanks.length) * 100)}%
              </div>
              <div className="score-message">
                {score === challenge.blanks.length ? 'Parfait !' : score >= challenge.blanks.length * 0.6 ? 'Bien joué !' : 'Courage !'}
              </div>
              <div className="score-detail">{score}/{challenge.blanks.length} correctas</div>
            </div>
            <button className="btn btn-outline" onClick={() => navigate('/')}>
              Volver al inicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
