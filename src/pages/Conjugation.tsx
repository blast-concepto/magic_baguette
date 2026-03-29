import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { verbs, subjects, tenseNames } from '../data/conjugation';
import { useProgress } from '../hooks/useProgress';
import SpeakButton from '../components/SpeakButton';

type TenseName = typeof tenseNames[number];

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

export default function Conjugation() {
  const navigate = useNavigate();
  const { updateTodayProgress, getDayNumber } = useProgress();
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const dayNum = getDayNumber();
  const verb = verbs[dayNum % verbs.length];

  const [tense, setTense] = useState<TenseName>('présent');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [showTranslation, setShowTranslation] = useState<Record<string, boolean>>({});
  const [showGroupInfo, setShowGroupInfo] = useState(false);

  const correctAnswers = useMemo(() => {
    const conj = verb.tenses[tense];
    const map: Record<string, string> = {};
    subjects.forEach(s => { map[s] = conj[s]; });
    return map;
  }, [verb, tense]);

  const examples = useMemo(() => {
    if (!verb.examples) return null;
    return verb.examples[tense];
  }, [verb, tense]);

  const translations = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t = (verb as any).translations as Record<string, Record<string, string>> | undefined;
    if (!t) return null;
    return t[tense];
  }, [verb, tense]);

  const handleInput = (subject: string, value: string) => {
    setAnswers(prev => ({ ...prev, [subject]: value }));
  };

  const checkAnswers = () => {
    const res: Record<string, boolean> = {};
    let correct = 0;
    subjects.forEach(s => {
      const isCorrect = normalize(answers[s] || '') === normalize(correctAnswers[s]);
      res[s] = isCorrect;
      if (isCorrect) correct++;
    });
    setResults(res);
    setChecked(true);
    const score = Math.round((correct / subjects.length) * 100);
    updateTodayProgress({ conjugationDone: true, conjugationScore: score });
  };

  const reset = (newTense?: TenseName) => {
    setAnswers({});
    setChecked(false);
    setResults({});
    setShowTranslation({});
    if (newTense) setTense(newTense);
  };

  const score = useMemo(() => {
    if (!checked) return 0;
    return Object.values(results).filter(Boolean).length;
  }, [checked, results]);

  const getFullForm = (subject: string) => {
    const form = correctAnswers[subject];
    if (subject === 'je' && /^[aeéèêiîoôuûh]/i.test(form)) {
      return `j'${form}`;
    }
    return `${subject} ${form}`;
  };

  // Split the example sentence around the conjugated form, returning [before, after]
  const splitExample = (sentence: string, subject: string): [string, string] | null => {
    const form = correctAnswers[subject];
    const fullForm = getFullForm(subject);

    const fullRegex = new RegExp(`(${fullForm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i');
    let match = sentence.match(fullRegex);
    if (match && match.index !== undefined) {
      return [sentence.slice(0, match.index), sentence.slice(match.index + match[0].length)];
    }

    const formRegex = new RegExp(`(\\b${form.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b)`, 'i');
    match = sentence.match(formRegex);
    if (match && match.index !== undefined) {
      return [sentence.slice(0, match.index), sentence.slice(match.index + match[0].length)];
    }

    return null;
  };

  // Build masked spoken text: read the sentence but skip the conjugated word
  const getMaskedSpokenText = (parts: [string, string]) => {
    const before = parts[0].trim();
    const after = parts[1].trim();
    // Join with a pause (comma makes TTS pause briefly)
    return `${before}, ${after}`;
  };

  const focusNext = (currentSubject: typeof subjects[number]) => {
    const idx = subjects.indexOf(currentSubject);
    if (idx < subjects.length - 1) {
      inputRefs.current[subjects[idx + 1]]?.focus();
    } else {
      checkAnswers();
    }
  };

  const toggleTranslation = (subject: string) => {
    setShowTranslation(prev => ({ ...prev, [subject]: !prev[subject] }));
  };

  return (
    <div className="fade-in">
      <div className="page-title">
        <button className="back-btn" onClick={() => navigate('/')}>
          &#x2190;
        </button>
        Conjugacion
      </div>

      <div className="card">
        <div className="verb-header">
          <div className="verb-infinitive">
            {verb.infinitive}
            <SpeakButton text={verb.infinitive} />
          </div>
          <div className="verb-english">
            {verb.english} &middot; {verb.group === 1 ? '1er' : verb.group === 2 ? '2do' : '3er'} grupo
            <button
              className="group-info-btn"
              onClick={() => setShowGroupInfo(!showGroupInfo)}
              aria-label="Info sobre el grupo"
            >
              i
            </button>
          </div>
          {showGroupInfo && (
            <div className="group-info-card fade-in">
              {verb.group === 1 && (
                <>
                  <div className="group-info-title">1er grupo &mdash; verbos en -er</div>
                  <div className="group-info-body">
                    La mayoria de los verbos franceses. Se conjugan de forma regular:
                    <br />Raiz + <strong>-e, -es, -e, -ons, -ez, -ent</strong>
                    <br /><em>Ejemplo: parler &rarr; je parl<strong>e</strong>, tu parl<strong>es</strong>, il parl<strong>e</strong>, nous parl<strong>ons</strong>, vous parl<strong>ez</strong>, ils parl<strong>ent</strong></em>
                    <br />Passe compose: auxiliar <strong>avoir</strong> + participio en <strong>-e</strong> (parle)
                    <br />Futuro simple: infinitivo + <strong>-ai, -as, -a, -ons, -ez, -ont</strong>
                  </div>
                </>
              )}
              {verb.group === 2 && (
                <>
                  <div className="group-info-title">2do grupo &mdash; verbos en -ir (con -issons)</div>
                  <div className="group-info-body">
                    Verbos regulares en -ir que forman "nous finissons".
                    <br />Raiz + <strong>-is, -is, -it, -issons, -issez, -issent</strong>
                    <br /><em>Ejemplo: finir &rarr; je fin<strong>is</strong>, tu fin<strong>is</strong>, il fin<strong>it</strong>, nous fin<strong>issons</strong>, vous fin<strong>issez</strong>, ils fin<strong>issent</strong></em>
                    <br />Passe compose: auxiliar <strong>avoir</strong> + participio en <strong>-i</strong> (fini)
                    <br />Futuro simple: infinitivo + <strong>-ai, -as, -a, -ons, -ez, -ont</strong>
                  </div>
                </>
              )}
              {verb.group === 3 && (
                <>
                  <div className="group-info-title">3er grupo &mdash; verbos irregulares</div>
                  <div className="group-info-body">
                    Incluye verbos en <strong>-ir</strong> (sin -issons), <strong>-re</strong>, <strong>-oir</strong> y otros irregulares.
                    <br />No siguen un patron unico: cada verbo tiene sus propias formas.
                    <br /><em>Ejemplos: etre, avoir, aller, faire, pouvoir, vouloir...</em>
                    <br />Passe compose: auxiliar <strong>avoir</strong> o <strong>etre</strong> + participio irregular
                    <br />Futuro simple: raiz irregular + <strong>-ai, -as, -a, -ons, -ez, -ont</strong>
                    <br /><em>Consejo: estos verbos se aprenden con la practica. Son los mas usados del frances!</em>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="tense-selector">
          {tenseNames.map(t => (
            <button
              key={t}
              className={`tense-btn ${tense === t ? 'active' : ''}`}
              onClick={() => reset(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="conj-sentences">
          {subjects.map(s => {
            const sentence = examples?.[s];
            const translation = translations?.[s];
            const parts = sentence ? splitExample(sentence, s) : null;

            return (
              <div key={s} className="conj-sentence-row">
                <div className="conj-subject-tag">{s}</div>
                {parts ? (
                  <div style={{ flex: 1 }}>
                    <div className="conj-sentence-text">
                      <span>{parts[0]}</span>
                      {!checked ? (
                        <input
                          ref={el => { inputRefs.current[s] = el; }}
                          className="conj-inline-input"
                          value={answers[s] || ''}
                          onChange={e => handleInput(s, e.target.value)}
                          placeholder="..."
                          onKeyDown={e => { if (e.key === 'Enter') focusNext(s); }}
                          style={{ width: Math.max(60, (correctAnswers[s].length + 2) * 10) }}
                        />
                      ) : (
                        <span className={`conj-inline-answer ${results[s] ? 'correct' : 'wrong'}`}>
                          {!results[s] && answers[s] && (
                            <span className="conj-inline-struck">{answers[s]}</span>
                          )}
                          <strong>{correctAnswers[s]}</strong>
                        </span>
                      )}
                      <span>{parts[1]}</span>
                      {!checked ? (
                        <SpeakButton text={getMaskedSpokenText(parts)} />
                      ) : (
                        sentence && <SpeakButton text={sentence} />
                      )}
                    </div>
                    {translation && (
                      <div className="conj-sentence-actions">
                        {!showTranslation[s] ? (
                          <button
                            className="conj-translate-btn"
                            onClick={() => toggleTranslation(s)}
                          >
                            Ver traduccion
                          </button>
                        ) : (
                          <div className="conj-translation" onClick={() => toggleTranslation(s)}>
                            {translation}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ flex: 1 }}>
                    <div className="conj-sentence-text">
                      {!checked ? (
                        <input
                          ref={el => { inputRefs.current[s] = el; }}
                          className="conj-inline-input"
                          value={answers[s] || ''}
                          onChange={e => handleInput(s, e.target.value)}
                          placeholder="..."
                          onKeyDown={e => { if (e.key === 'Enter') focusNext(s); }}
                          style={{ width: Math.max(60, (correctAnswers[s].length + 2) * 10) }}
                        />
                      ) : (
                        <span className={`conj-inline-answer ${results[s] ? 'correct' : 'wrong'}`}>
                          {!results[s] && answers[s] && (
                            <span className="conj-inline-struck">{answers[s]}</span>
                          )}
                          <strong>{correctAnswers[s]}</strong>
                        </span>
                      )}
                      {checked && <SpeakButton text={getFullForm(s)} />}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!checked ? (
          <button className="btn btn-primary" onClick={checkAnswers} style={{ marginTop: 16 }}>
            Verificar respuestas
          </button>
        ) : (
          <div style={{ marginTop: 16 }}>
            <div className="score-display" style={{ padding: '16px 0' }}>
              <div className="score-message">
                {score === 6 ? 'Parfait !' : score >= 4 ? 'Bien joue !' : 'Courage !'}
              </div>
              <div className="score-detail">{score}/6 correctas</div>
            </div>
            <button className="btn btn-primary" onClick={() => reset()}>
              Intentar de nuevo
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/')}>
              Volver al inicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
