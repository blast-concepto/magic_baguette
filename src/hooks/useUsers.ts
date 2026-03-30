import { supabase } from '../lib/supabase';

export interface User {
  id: string;
  name: string;
  created_at: string;
}

const ACTIVE_KEY = 'mb-active-user';

// Active user is device-local — correct behaviour (each device remembers its own session)
export function getActiveUserId(): string | null {
  return localStorage.getItem(ACTIVE_KEY);
}

export function setActiveUserId(id: string | null) {
  if (id) localStorage.setItem(ACTIVE_KEY, id);
  else localStorage.removeItem(ACTIVE_KEY);
}

export async function getUsers(): Promise<User[]> {
  const { data } = await supabase
    .from('profiles')
    .select('id, name, created_at')
    .order('created_at');
  return data ?? [];
}

export async function createUser(name: string): Promise<User> {
  const { data, error } = await supabase
    .from('profiles')
    .insert({ name: name.trim() })
    .select('id, name, created_at')
    .single();
  if (error) throw error;
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  await supabase.from('profiles').delete().eq('id', id);
  if (getActiveUserId() === id) setActiveUserId(null);
}

export function getProgressKey(userId: string): string {
  return `mb-progress-${userId}`;
}
