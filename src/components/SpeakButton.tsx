import { useSpeech } from '../hooks/useSpeech';

interface SpeakButtonProps {
  text: string;
}

export default function SpeakButton({ text }: SpeakButtonProps) {
  const { speak, speaking, supported } = useSpeech();

  if (!supported) return null;

  return (
    <button
      className={`speak-btn ${speaking ? 'speak-btn-active' : ''}`}
      onClick={() => speak(text)}
      aria-label={`Escuchar: ${text}`}
      type="button"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        {speaking ? (
          <>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </>
        ) : (
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        )}
      </svg>
    </button>
  );
}
