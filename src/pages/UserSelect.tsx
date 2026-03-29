import { useState } from 'react';
import { getUsers, createUser, setActiveUserId, deleteUser } from '../hooks/useUsers';
import type { User } from '../hooks/useUsers';
import Avatar from '../components/Avatar';

interface Props {
  onSelect: (user: User) => void;
}

function BaguetteLogo() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="36" fill="url(#bgGrad)" opacity="0.12"/>
      <rect x="10" y="32" width="60" height="18" rx="9" transform="rotate(-22 40 41)" fill="url(#baguetteGrad)"/>
      <g transform="rotate(-22 40 41)" stroke="rgba(255,220,120,0.55)" strokeWidth="1.8" strokeLinecap="round">
        <line x1="24" y1="32" x2="21" y2="41"/>
        <line x1="34" y1="32" x2="31" y2="41"/>
        <line x1="44" y1="32" x2="41" y2="41"/>
        <line x1="54" y1="32" x2="51" y2="41"/>
      </g>
      <g transform="translate(60,14)">
        <line x1="0" y1="-5" x2="0" y2="5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
        <line x1="-5" y1="0" x2="5" y2="0" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
        <line x1="-3.5" y1="-3.5" x2="3.5" y2="3.5" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <line x1="3.5" y1="-3.5" x2="-3.5" y2="3.5" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </g>
      <g transform="translate(16,62)">
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#ec4899" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="-4" y1="0" x2="4" y2="0" stroke="#ec4899" strokeWidth="1.8" strokeLinecap="round"/>
      </g>
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="80" y2="80">
          <stop stopColor="#6366f1"/>
          <stop offset="1" stopColor="#ec4899"/>
        </linearGradient>
        <linearGradient id="baguetteGrad" x1="10" y1="32" x2="70" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f97316"/>
          <stop offset="0.5" stopColor="#fbbf24"/>
          <stop offset="1" stopColor="#d97706"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function UserSelect({ onSelect }: Props) {
  const [users, setUsers] = useState<User[]>(getUsers);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleSelect = (user: User) => {
    setActiveUserId(user.id);
    onSelect(user);
  };

  const handleCreate = () => {
    if (!name.trim()) return;
    const user = createUser(name);
    setUsers(getUsers());
    setCreating(false);
    setName('');
    setActiveUserId(user.id);
    onSelect(user);
  };

  const handleDelete = (id: string) => {
    deleteUser(id);
    setUsers(getUsers());
    setConfirmDelete(null);
  };

  return (
    <div className="user-select-screen fade-in">
      <div className="user-select-header">
        <BaguetteLogo />
        <h1 className="user-select-title">Magic Baguette</h1>
        <p className="user-select-tagline">Aprende francés en 10 minutos al día</p>
      </div>

      <div className="app-description">
        <div className="app-desc-row"><span className="app-desc-icon">📖</span><span>Vocabulario con pronunciación y ejemplos</span></div>
        <div className="app-desc-row"><span className="app-desc-icon">✍️</span><span>Conjugaciones con frases en contexto</span></div>
        <div className="app-desc-row"><span className="app-desc-icon">🎯</span><span>Un reto real cada día</span></div>
        <div className="app-desc-row"><span className="app-desc-icon">💬</span><span>Diálogos para practicar conversación</span></div>
      </div>

      <p className="user-select-sub">Elige tu perfil para continuar</p>

      <div className="user-list">
        {users.map(user => (
          <div key={user.id} className="user-card-wrapper">
            {confirmDelete === user.id ? (
              <div className="user-card user-card-confirm">
                <span style={{ fontSize: 14 }}>¿Eliminar a <strong>{user.name}</strong>?</span>
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <button className="btn btn-outline" style={{ flex: 1, padding: '8px' }} onClick={() => setConfirmDelete(null)}>
                    Cancelar
                  </button>
                  <button className="btn btn-danger" style={{ flex: 1, padding: '8px' }} onClick={() => handleDelete(user.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ) : (
              <div className="user-card" onClick={() => handleSelect(user)}>
                <Avatar name={user.name} />
                <div className="user-card-name">{user.name}</div>
                <button
                  className="user-card-delete"
                  onClick={e => { e.stopPropagation(); setConfirmDelete(user.id); }}
                  aria-label="Eliminar usuario"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        ))}

        {!creating ? (
          <button className="user-card user-card-new" onClick={() => setCreating(true)}>
            <div className="user-card-plus">+</div>
            <div className="user-card-name" style={{ opacity: 0.5 }}>Nuevo perfil</div>
          </button>
        ) : (
          <div className="user-create-form fade-in">
            <input
              className="user-create-input"
              placeholder="Tu nombre..."
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') setCreating(false); }}
              autoFocus
              maxLength={20}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button className="btn btn-outline" style={{ flex: 1, padding: '10px' }} onClick={() => { setCreating(false); setName(''); }}>
                Cancelar
              </button>
              <button className="btn btn-primary" style={{ flex: 1, padding: '10px' }} onClick={handleCreate} disabled={!name.trim()}>
                Entrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
