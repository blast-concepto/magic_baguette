import { useState, useCallback, useEffect } from 'react';

const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

// Module-level voice cache shared across all hook instances
let frenchVoice: SpeechSynthesisVoice | null = null;
let voicesLoaded = false;

// Some macOS voices (e.g. Daniel, Google français) fire onstart/onend
// instantly without producing audio. Prefer known-good voices first,
// then fall back to any local French voice.
const PREFERRED = ['Thomas', 'Amélie', 'Marie', 'Jacques'];

function loadFrenchVoice() {
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return;
  voicesLoaded = true;

  const french = voices.filter(v => v.lang.startsWith('fr'));

  // Try preferred voices first
  for (const name of PREFERRED) {
    const v = french.find(v => v.name === name);
    if (v) { frenchVoice = v; return; }
  }

  // Fall back to any local fr-FR voice, then any local fr-* voice
  frenchVoice =
    french.find(v => v.lang === 'fr-FR' && v.localService) ??
    french.find(v => v.localService) ??
    french.find(v => v.lang === 'fr-FR') ??
    french[0] ??
    null;
}

if (supported) {
  loadFrenchVoice();
  window.speechSynthesis.addEventListener('voiceschanged', loadFrenchVoice);
}

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!supported || voicesLoaded) return;
    const handler = () => loadFrenchVoice();
    window.speechSynthesis.addEventListener('voiceschanged', handler);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', handler);
  }, []);

  const speak = useCallback((text: string) => {
    if (!supported) return;

    window.speechSynthesis.cancel();

    // Short delay after cancel — Chrome drops utterances otherwise
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      utterance.volume = 1;

      if (frenchVoice) {
        utterance.voice = frenchVoice;
      }

      // Keep reference to prevent garbage collection
      (window as unknown as Record<string, unknown>).__currentUtterance = utterance;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }, 50);
  }, []);

  return { speak, speaking, supported };
}
