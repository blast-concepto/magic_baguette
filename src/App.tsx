import { useState } from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Vocabulary from './pages/Vocabulary';
import Conjugation from './pages/Conjugation';
import Challenge from './pages/Challenge';
import Dialogues from './pages/Dialogues';
import ProgressPage from './pages/Progress';
import Exercise from './pages/Exercise';
import UserSelect from './pages/UserSelect';
import { getActiveUserId, getUsers, setActiveUserId } from './hooks/useUsers';
import type { User } from './hooks/useUsers';
import './index.css';

function App() {
  const [activeUser, setActiveUser] = useState<User | null>(() => {
    const id = getActiveUserId();
    if (!id) return null;
    return getUsers().find(u => u.id === id) ?? null;
  });

  const handleSelectUser = (user: User) => {
    setActiveUser(user);
  };

  const handleSwitchUser = () => {
    setActiveUserId(null);
    setActiveUser(null);
  };

  if (!activeUser) {
    return <UserSelect onSelect={handleSelectUser} />;
  }

  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home activeUser={activeUser} onSwitchUser={handleSwitchUser} />} />
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
          <span className="nav-icon">&#x1F3E0;</span>
          Inicio
        </NavLink>
        <NavLink to="/vocabulary">
          <span className="nav-icon">&#x1F4D6;</span>
          Vocab
        </NavLink>
        <NavLink to="/conjugation">
          <span className="nav-icon">&#x270D;&#xFE0F;</span>
          Verbos
        </NavLink>
        <NavLink to="/challenge">
          <span className="nav-icon">&#x1F3AF;</span>
          Reto
        </NavLink>
        <NavLink to="/dialogues">
          <span className="nav-icon">&#x1F4AC;</span>
          Diálogos
        </NavLink>
        <NavLink to="/exercise">
          <span className="nav-icon">&#x270F;&#xFE0F;</span>
          Ejercicio
        </NavLink>
        <NavLink to="/progress">
          <span className="nav-icon">&#x1F4CA;</span>
          Progreso
        </NavLink>
      </nav>
    </HashRouter>
  );
}

export default App;
