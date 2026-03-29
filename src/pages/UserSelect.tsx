import { useState } from 'react';
import { getUsers, createUser, setActiveUserId, deleteUser } from '../hooks/useUsers';
import type { User } from '../hooks/useUsers';

interface Props {
  onSelect: (user: User) => void;
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
        <div style={{ fontSize: 48 }}>🇫🇷</div>
        <h1 className="user-select-title">French Daily</h1>
        <p className="user-select-sub">Elige tu perfil para continuar</p>
      </div>

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
                <div className="user-card-emoji">{user.emoji}</div>
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
            <div className="user-card-emoji" style={{ opacity: 0.4 }}>+</div>
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
