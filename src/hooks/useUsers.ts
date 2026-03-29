export interface User {
  id: string;
  name: string;
  emoji: string;
  createdAt: string;
}

const USERS_KEY = 'french-daily-users';
const ACTIVE_KEY = 'french-daily-active-user';

const EMOJIS = ['🦊', '🐬', '🌸', '🦋', '🐻', '🌙', '⭐', '🦁', '🐙', '🌿', '🎸', '🍀'];

export function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getActiveUserId(): string | null {
  return localStorage.getItem(ACTIVE_KEY);
}

export function setActiveUserId(id: string | null) {
  if (id) {
    localStorage.setItem(ACTIVE_KEY, id);
  } else {
    localStorage.removeItem(ACTIVE_KEY);
  }
}

export function createUser(name: string): User {
  const users = getUsers();
  const usedEmojis = users.map(u => u.emoji);
  const available = EMOJIS.filter(e => !usedEmojis.includes(e));
  const emoji = available.length > 0
    ? available[0]
    : EMOJIS[users.length % EMOJIS.length];

  const user: User = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    emoji,
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, user]);
  return user;
}

export function deleteUser(id: string) {
  const users = getUsers().filter(u => u.id !== id);
  saveUsers(users);
  localStorage.removeItem(`french-daily-progress-${id}`);
  if (getActiveUserId() === id) {
    setActiveUserId(null);
  }
}

export function getProgressKey(userId: string): string {
  return `french-daily-progress-${userId}`;
}
