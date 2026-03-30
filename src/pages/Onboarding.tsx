import { useState } from 'react';

interface Props { onDone: () => void; }

const SLIDES = [
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 88 88" fill="none">
        <defs>
          <linearGradient id="og1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" stopOpacity="0.12"/><stop offset="100%" stopColor="#ec4899" stopOpacity="0.12"/></linearGradient>
          <linearGradient id="ob1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#c2410c"/><stop offset="50%" stopColor="#fbbf24"/><stop offset="100%" stopColor="#d97706"/></linearGradient>
        </defs>
        <circle cx="44" cy="44" r="40" fill="url(#og1)"/>
        <g transform="rotate(-22,44,44)"><rect x="14" y="38" width="60" height="14" rx="7" fill="url(#ob1)"/><line x1="28" y1="38" x2="26" y2="52" stroke="rgba(255,210,100,0.5)" strokeWidth="1.5" strokeLinecap="round"/><line x1="38" y1="38" x2="36" y2="52" stroke="rgba(255,210,100,0.5)" strokeWidth="1.5" strokeLinecap="round"/><line x1="48" y1="38" x2="46" y2="52" stroke="rgba(255,210,100,0.5)" strokeWidth="1.5" strokeLinecap="round"/><line x1="58" y1="38" x2="56" y2="52" stroke="rgba(255,210,100,0.5)" strokeWidth="1.5" strokeLinecap="round"/></g>
        <g transform="translate(68,16)" stroke="#6366f1" strokeLinecap="round"><line x1="0" y1="-6" x2="0" y2="6" strokeWidth="2.5"/><line x1="-6" y1="0" x2="6" y2="0" strokeWidth="2.5"/></g>
      </svg>
    ),
    title: '¡Bienvenido a Magic Baguette!',
    body: 'Tu app de francés diario. Aprende vocabulario, verbos y frases reales en solo 10 minutos al día.',
  },
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="var(--bg-subtle)"/>
        <g stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" fill="none">
          <rect x="12" y="16" width="10" height="10" rx="3"/>
          <rect x="27" y="16" width="10" height="10" rx="3"/>
          <rect x="42" y="16" width="10" height="10" rx="3"/>
          <rect x="12" y="32" width="10" height="10" rx="3"/>
          <rect x="27" y="32" width="10" height="10" rx="3"/>
        </g>
        <polyline points="36 37 40 41 48 31" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
    title: 'Tu rutina diaria',
    body: 'Cada día tiene 4 actividades: vocabulario, conjugación, reto del día y diálogo. Completa las 4 para mantener tu racha.',
  },
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="var(--bg-subtle)"/>
        <polyline points="18 34 27 43 46 22" stroke="var(--success)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
    title: '¡Todo listo!',
    body: 'Practica cada día, gana medallas y compite con tus amigos en la clasificación. Bonne chance !',
  },
];

export default function Onboarding({ onDone }: Props) {
  const [step, setStep] = useState(0);
  const slide = SLIDES[step];
  const isLast = step === SLIDES.length - 1;

  return (
    <div className="onboarding-screen fade-in">
      <div className="onboarding-slides">
        <div className="onboarding-icon">{slide.icon}</div>
        <h2 className="onboarding-title">{slide.title}</h2>
        <p className="onboarding-body">{slide.body}</p>
      </div>

      <div className="onboarding-dots">
        {SLIDES.map((_, i) => (
          <div key={i} className={`onboarding-dot ${i === step ? 'active' : ''}`} />
        ))}
      </div>

      <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => isLast ? onDone() : setStep(s => s + 1)}>
        {isLast ? 'Empezar' : 'Siguiente'}
      </button>
      {!isLast && (
        <button className="btn btn-ghost" style={{ width: '100%', marginTop: 8 }} onClick={onDone}>
          Saltar
        </button>
      )}
    </div>
  );
}
