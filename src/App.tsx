import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Vocabulary from './pages/Vocabulary';
import Conjugation from './pages/Conjugation';
import Challenge from './pages/Challenge';
import Dialogues from './pages/Dialogues';
import ProgressPage from './pages/Progress';
import Exercise from './pages/Exercise';
import UserSelect from './pages/UserSelect';
import { getActiveUserId, setActiveUserId, getProgressKey } from './hooks/useUsers';
import { loadProgressFromSupabase } from './hooks/useProgress';
import { supabase } from './lib/supabase';
import type { User } from './hooks/useUsers';
import './index.css';

type AppState = 'loading' | 'select' | 'app';

function App() {
  const [appState, setAppState] = useState<AppState>(() =>
    getActiveUserId() ? 'loading' : 'select'
  );
  const [activeUser, setActiveUser] = useState<User | null>(null);

  // On first load: verify stored user still exists + hydrate progress from Supabase
  useEffect(() => {
    if (appState !== 'loading') return;
    const uid = getActiveUserId();
    if (!uid) { setAppState('select'); return; }

    (async () => {
      try {
        const { data } = await supabase.from('profiles').select('id, name, created_at').eq('id', uid).single();
        if (!data) { setActiveUserId(null); setAppState('select'); return; }
        setActiveUser(data);
        await loadProgressFromSupabase(uid);
        setAppState('app');
      } catch {
        setActiveUserId(null); setAppState('select');
      }
    })();
  }, [appState]);

  const handleSelectUser = async (user: User) => {
    setActiveUserId(user.id);
    setActiveUser(user);
    setAppState('loading');  // triggers useEffect above which hydrates + enters app
  };

  const handleSwitchUser = () => {
    setActiveUserId(null);
    setActiveUser(null);
    // Clear cached progress for clean slate display
    const uid = activeUser?.id;
    if (uid) localStorage.removeItem(getProgressKey(uid));
    setAppState('select');
  };

  if (appState === 'loading') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100dvh', gap: 14 }}>
        <div className="spinner" />
        <p style={{ color: 'var(--text-light)', fontSize: 14 }}>Cargando tu progreso…</p>
      </div>
    );
  }

  if (appState === 'select') {
    return <UserSelect onSelect={handleSelectUser} />;
  }

  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home activeUser={activeUser!} onSwitchUser={handleSwitchUser} />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/conjugation" element={<Conjugation />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/dialogues" element={<Dialogues />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/exercise" element={<Exercise />} />
        </Routes>
      </div>
      <nav className="nav">
        <NavLink to="/" end>
          <span className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </span>
          Inicio
        </NavLink>
        <NavLink to="/vocabulary">
          <span className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
          </span>
          Vocab
        </NavLink>
        <NavLink to="/conjugation">
          <span className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="17" y1="3" x2="3" y2="17"/><path d="M7 3H3v4"/><path d="M21 7V3h-4"/><path d="M3 21h4"/><path d="M21 21h-4v-4"/></svg>
          </span>
          Verbos
        </NavLink>
        <NavLink to="/challenge">
          <span className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          </span>
          Reto
        </NavLink>
        <NavLink to="/dialogues">
          <span className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          </span>
          Diálogos
        </NavLink>
        <NavLink to="/exercise">
          <span className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </span>
          Ejercicio
        </NavLink>
        <NavLink to="/progress">
          <span className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          </span>
          Progreso
        </NavLink>
      </nav>
    </HashRouter>
  );
}

export default App;
