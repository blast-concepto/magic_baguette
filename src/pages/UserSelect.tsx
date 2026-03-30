import { useState, useEffect } from 'react';
import { getUsers, createUser, setActiveUserId, deleteUser } from '../hooks/useUsers';
import type { User } from '../hooks/useUsers';
import Avatar from '../components/Avatar';

interface Props {
  onSelect: (user: User) => void;
}

function BaguetteLogo() {
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.12"/>
        </linearGradient>
        <linearGradient id="baguette" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c2410c"/>
          <stop offset="30%" stopColor="#f97316"/>
          <stop offset="60%" stopColor="#fbbf24"/>
          <stop offset="100%" stopColor="#d97706"/>
        </linearGradient>
      </defs>
      <circle cx="44" cy="44" r="40" fill="url(#logoGlow)"/>
      <g transform="rotate(-22, 44, 44)">
        <rect x="14" y="38" width="60" height="14" rx="7" fill="url(#baguette)"/>
        <line x1="28" y1="38" x2="26" y2="52" stroke="rgba(255,210,100,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="38" y1="38" x2="36" y2="52" stroke="rgba(255,210,100,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="48" y1="38" x2="46" y2="52" stroke="rgba(255,210,100,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="58" y1="38" x2="56" y2="52" stroke="rgba(255,210,100,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      <g transform="translate(68, 16)" stroke="#6366f1" strokeLinecap="round">
        <line x1="0" y1="-6" x2="0" y2="6" strokeWidth="2.5"/>
        <line x1="-6" y1="0" x2="6" y2="0" strokeWidth="2.5"/>
        <line x1="-4" y1="-4" x2="4" y2="4" strokeWidth="1.5" opacity="0.4"/>
        <line x1="4" y1="-4" x2="-4" y2="4" strokeWidth="1.5" opacity="0.4"/>
      </g>
      <g transform="translate(18, 68)" stroke="#ec4899" strokeLinecap="round">
        <line x1="0" y1="-4" x2="0" y2="4" strokeWidth="2"/>
        <line x1="-4" y1="0" x2="4" y2="0" strokeWidth="2"/>
      </g>
    </svg>
  );
}

export default function UserSelect({ onSelect }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .finally(() => setLoadingUsers(false));
  }, []);

  const handleSelect = (user: User) => {
    setActiveUserId(user.id);
    onSelect(user);
  };

  const handleCreate = async () => {
    if (!name.trim() || saving) return;
    setSaving(true);
    setError(null);
    try {
      const user = await createUser(name);
      setActiveUserId(user.id);
      onSelect(user);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    setUsers(prev => prev.filter(u => u.id !== id));
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
        <div className="app-desc-row">
          <span className="app-desc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg></span>
          <span>Vocabulario con pronunciación y ejemplos</span>
        </div>
        <div className="app-desc-row">
          <span className="app-desc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg></span>
          <span>Conjugaciones con frases en contexto</span>
        </div>
        <div className="app-desc-row">
          <span className="app-desc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span>
          <span>Un reto real cada día</span>
        </div>
        <div className="app-desc-row">
          <span className="app-desc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></span>
          <span>Diálogos para practicar conversación</span>
        </div>
      </div>

      <p className="user-select-sub">Elige tu perfil para continuar</p>

      <div className="user-list">
        {loadingUsers ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
            <div className="spinner" />
          </div>
        ) : (
          <>
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
                  disabled={saving}
                />
                {error && (
                  <p style={{ color: 'var(--danger)', fontSize: 13, marginTop: 8 }}>{error}</p>
                )}
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <button className="btn btn-outline" style={{ flex: 1, padding: '10px' }} onClick={() => { setCreating(false); setName(''); setError(null); }} disabled={saving}>
                    Cancelar
                  </button>
                  <button className="btn btn-primary" style={{ flex: 1, padding: '10px' }} onClick={handleCreate} disabled={!name.trim() || saving}>
                    {saving ? '…' : 'Entrar'}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
