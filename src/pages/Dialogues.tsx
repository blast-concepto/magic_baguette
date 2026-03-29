import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { dialogues } from '../data/dialogues';
import { useProgress } from '../hooks/useProgress';
import SpeakButton from '../components/SpeakButton';
import { useSpeech } from '../hooks/useSpeech';

const LINES_PER_STEP = 3;

export default function Dialogues() {
  const navigate = useNavigate();
  const { getDayNumber } = useProgress();
  const { speak } = useSpeech();

  const dayNum = getDayNumber();
  const dialogue = dialogues[dayNum % dialogues.length];

  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const totalSteps = Math.ceil(dialogue.lines.length / LINES_PER_STEP);
  const startIdx = step * LINES_PER_STEP;
  const visibleLines = dialogue.lines.slice(startIdx, startIdx + LINES_PER_STEP);

  const allRevealed = useMemo(() => {
    return visibleLines.every((_, i) => revealed[startIdx + i]);
  }, [revealed, startIdx, visibleLines]);

  const toggleReveal = (idx: number) => {
    setRevealed(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const nextStep = () => {
    if (step + 1 < totalSteps) {
      setStep(s => s + 1);
      setRevealed({});
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(s => s - 1);
      setRevealed({});
    }
  };

  const playAll = () => {
    const text = visibleLines.map(l => l.french).join('. ');
    speak(text);
  };

  return (
    <div className="fade-in">
      <div className="page-title">
        <button className="back-btn" onClick={() => navigate('/')}>
          &#x2190;
        </button>
        Diálogo del día
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">{dialogue.title}</span>
          <span className="dialogue-progress">{step + 1} / {totalSteps}</span>
        </div>

        <div className="dialogue-context" style={{ marginBottom: 16 }}>
          {dialogue.context}
        </div>

        <div className="dialogue-tags" style={{ marginBottom: 16 }}>
          {dialogue.tags.map(tag => (
            <span key={tag} className="dialogue-tag">{tag}</span>
          ))}
        </div>

        <div className="dialogue-lines-group">
          {visibleLines.map((line, i) => {
            const globalIdx = startIdx + i;
            return (
              <div key={globalIdx} className="dialogue-line-block fade-in">
                <div className="dialogue-speaker-label">
                  {line.speaker === 'A' ? 'Persona A' : 'Persona B'}
                </div>

                <div className="dialogue-french-line">
                  <span>{line.french}</span>
                  <SpeakButton text={line.french} />
                </div>

                <button
                  className="dialogue-reveal-btn"
                  onClick={() => toggleReveal(globalIdx)}
                >
                  {revealed[globalIdx] ? 'Ocultar' : 'Revelar traducción'}
                </button>

                {revealed[globalIdx] && (
                  <div className="dialogue-spanish-line fade-in">
                    {line.spanish}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button className="btn btn-outline" onClick={playAll} style={{ marginTop: 16 }}>
          &#x1F50A; Escuchar todas
        </button>

        <div className="dialogue-nav-btns">
          <button
            className="btn btn-outline"
            disabled={step === 0}
            onClick={prevStep}
            style={{ flex: 1 }}
          >
            Anterior
          </button>
          <button
            className="btn btn-primary"
            disabled={step === totalSteps - 1}
            onClick={nextStep}
            style={{ flex: 1 }}
          >
            Siguiente
          </button>
        </div>

        {step === totalSteps - 1 && allRevealed && (
          <button className="btn btn-success" onClick={() => navigate('/')} style={{ marginTop: 10 }}>
            Volver al inicio
          </button>
        )}
      </div>
    </div>
  );
}
